from django.core.management.base import BaseCommand
from django.db import connection

# Sample data for superheroes, teams, activities, leaderboard, and workouts
def get_sample_data():
    users = [
        {"name": "Superman", "email": "superman@dc.com", "team": "DC"},
        {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
        {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
        {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
        {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
        {"name": "Black Widow", "email": "widow@marvel.com", "team": "Marvel"},
    ]
    teams = [
        {"name": "Marvel", "members": ["Iron Man", "Captain America", "Black Widow"]},
        {"name": "DC", "members": ["Superman", "Batman", "Wonder Woman"]},
    ]
    activities = [
        {"user": "Superman", "activity": "Flight", "duration": 60},
        {"user": "Batman", "activity": "Martial Arts", "duration": 45},
        {"user": "Iron Man", "activity": "Weight Lifting", "duration": 30},
    ]
    leaderboard = [
        {"user": "Superman", "points": 100},
        {"user": "Iron Man", "points": 90},
        {"user": "Batman", "points": 80},
    ]
    workouts = [
        {"name": "Strength Training", "suggested_for": "Marvel"},
        {"name": "Agility Drills", "suggested_for": "DC"},
    ]
    return users, teams, activities, leaderboard, workouts

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        db = connection.cursor().db_conn
        users, teams, activities, leaderboard, workouts = get_sample_data()

        # Clear collections
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Ensure unique index on email
        db.users.create_index([('email', 1)], unique=True)

        # Insert sample data
        db.users.insert_many(users)
        db.teams.insert_many(teams)
        db.activities.insert_many(activities)
        db.leaderboard.insert_many(leaderboard)
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data and unique index on email.'))
