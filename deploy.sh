# Stop and remove pm2 service
pm2 stop fruk0st_bot
pm2 delete fruk0st_bot

# Fetch latest updates from repository
git pull

# Build and restart the service
npm run build
pm2 start npm --name "fruk0st_bot" -- start