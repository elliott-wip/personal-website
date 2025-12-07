#!/bin/bash
# Quick script to add, commit, and push changes to GitHub

cd /Users/echang/Github/personal-website

git add .

# Use provided commit message or default
COMMIT_MSG=${1:-"Update website"}
git commit -m "$COMMIT_MSG"

git push

echo "✅ Changes pushed to GitHub!"

