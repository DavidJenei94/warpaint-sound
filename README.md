# warpaint-sound
Project to track sounds of musical instruments on a map around the world.

# Setup
To properly run app:

## Frontend
env variables needed:

for dev:
- RECAPTCHA_SITE_KEY
- BACKEND_URL
- WDS_SOCKET_PORT (0 in dev cases)
- WATCHPACK_POLLING=true # replaced: - CHOKIDAR_USEPOLLING=true / to check changes in react

for dev put them in the main .env file beside docker-compose.yml

for prod:
- REACT_APP_RECAPTCHA_SITE_KEY
- REACT_APP_BACKEND_URL

for prod aws static hosting, create a .env.prod file in the main project folder and then build with "build": "env-cmd -f .env.prod react-scripts build" (env-cmd should be installed globally or locally to be able to run it)

## Backend
env variables needed:

for dev:
ENVIRONMENT=development
- DB_HOST=wpsound_db (or whatever the name of the db instance is from docker-compose)
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_PORT
- DB_DIALECT=postgres
- RECAPTCHA_SECRET_KEY
- TOKEN_KEY (randomly generated characters to make token for admin to keep logged in for a period of time)
- WARPAINTVISION_GMAIL_EMAIL (for sound record reporting email) # google / "dots" / account / security / Signing in to google / App password (2-step should be enabled) / Warpaint Sound
- WARPAINTVISION_GMAIL_PASSWORD

These should be added to the main .env file


for prod with aws:
- ENVIRONMENT=production
- DB_DIALECT=postgres
- RECAPTCHA_SECRET_KEY
- TOKEN_KEY (randomly generated characters to make token for admin to keep logged in for a period of time)
- WARPAINTVISION_GMAIL_EMAIL (for sound record reporting email)
- WARPAINTVISION_GMAIL_PASSWORD
- AWS_UPLOADS_BUCKET (the name of the bucket where images and audio files are stored)
- AWS_BUCKET_REGION (region of mentioned bucket)
- AWS_ACCESS_KEY (generated access key for IAM user created with policies attached to the bucket to put, get, delete these files)
- AWS_SECRET_KEY (generated secret key for...)

These should be added to the beanstalk instance / configuration / software

for prod if DB is connected with beanstalk, the following env variables are available for nodejs app:
- RDS_HOSTNAME (used instead of DB_HOST in dev)
- RDS_USERNAME (used instead of DB_USER in dev)
- RDS_PASSWORD (used instead of DB_PASSWORD in dev)
- RDS_DB_NAME (used instead of DB_NAME in dev)
- RDS_PORT (used instead of DB_PORT in dev)


