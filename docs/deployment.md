# AWS demo deployment

## Architecture and limits

The deployment uses a static Next.js export in a public S3 website bucket, a FastAPI health endpoint on Lambda behind an API Gateway HTTP API, and an isolated single-AZ PostgreSQL RDS instance. GitHub Actions deploys the UI and API on pushes to `main` (including merges) using GitHub OIDC; no long-lived AWS keys are stored in GitHub. PostgreSQL is provisioned as requested, but the current backend does not connect to it or store application data.

This is a public demonstration stack, not production infrastructure. The S3 website endpoint uses HTTP and has no custom domain or TLS. The database has no inbound internet access and no application integration. The tiny RDS instance has 1 GiB memory and single-AZ availability.

The template selects `db.t3.micro`, 20 GiB gp2 storage, Single-AZ and a one-day backup retention. Those settings fit the documented RDS Free Tier shape, but eligibility depends on the account's plan and remaining free period/credits. AWS documents the RDS free plan for qualifying accounts and lists `db.t3.micro`/`db.t4g.micro` with 750 hours/month; legacy accounts signed up before July 15, 2025 have a 12-month offer. The current account eligibility must be checked before creating the stack. The deployment must stop if AWS says it is not eligible under the operator-selected Free Tier-only constraint. [AWS RDS free-tier details](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html) [AWS Free Tier FAQ](https://aws.amazon.com/free/free-tier-faqs/)

If the free offer is unavailable, RDS PostgreSQL `db.t3.micro` in `us-east-1` is the paid fallback at about $0.019/hour (about $13.87 for 730 hours) plus 20 GiB gp2 storage at about $0.115/GiB-month (about $2.30), or roughly **$16.17/month** before CPU-credit, I/O, backup-overage, data-transfer, and tax charges. The operator selected Free Tier only, so this fallback is informational and must not be provisioned without a new decision. AWS describes the hourly billing model and the storage price basis on its [RDS pricing page](https://aws.amazon.com/rds/postgresql/pricing/) and [RDS storage pricing example](https://aws.amazon.com/rds/custom/pricing/).

## AWS bootstrap

The stack needs an existing SSM Parameter Store **Standard** `SecureString` at `/apple-investments/postgres/master-password`; its value is used only as the RDS master password. Create it with a fresh password in the AWS console before stack creation. Do not put that value in Git, a command line, workflow variable, or this document. Standard Parameter Store parameters do not have a monthly storage charge within the documented standard-tier limit.

The selected deployment account is in `us-east-1`. Its account-plan API reports `PAID` with no remaining credits, and the operator confirmed active Free Tier service coverage for RDS PostgreSQL, S3, Lambda, API Gateway, and CloudWatch Logs. Stack `apple-investments-demo` is deployed and the UI and API have been initialized. The API health endpoint returns HTTP 200. The database is a private `db.t3.micro` PostgreSQL instance with 20 GiB storage. The AWS bootstrap used a credential with the required stack permissions; a separate earlier credential had organization SCP denies that an IAM allow could not override.

Create the SSM parameter as a Standard SecureString, then create the stack using infra/aws.yml, passing the GitHub owner and repository. The CloudFormation stack creates the hosting resources, an OIDC provider, and a GitHub deploy role restricted to the repository's main branch. The account must not already have a `token.actions.githubusercontent.com` OIDC provider, because IAM permits only one provider for that URL per account.

After stack creation, configure these GitHub repository **variables** from the stack outputs. The deployed stack's values are shown below; both variables are required before GitHub Actions can assume the deploy role:

| Variable | Value |
| --- | --- |
| `AWS_REGION` | `us-east-1` |
| `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::604609572854:role/apple-investments-github-deploy` (`DeployRoleArn` output) |

The workflow assumes this role with OIDC, reads the stack's public bucket/API/function outputs, runs the project gate, updates the Lambda package, and syncs the static export. It requires no GitHub secrets. A merged change reaches `main` and triggers the deployment; a failed gate prevents deployment steps.

The role permits only reading CloudFormation stack outputs, listing and updating the named website bucket, and updating the named Lambda function's code. It cannot alter the database or infrastructure after bootstrap.
