-- Seed data for Club Falcon
-- Password for all users: "password123"
-- bcrypt hash generated with 10 rounds

-- =====================
-- Users
-- =====================
INSERT INTO "User" ("id", "email", "password", "name", "createdAt", "updatedAt") VALUES
  ('u1', 'alice@example.com',   '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Alice Johnson',  NOW(), NOW()),
  ('u2', 'bob@example.com',     '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Bob Smith',      NOW(), NOW()),
  ('u3', 'charlie@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Charlie Davis',  NOW(), NOW());

-- =====================
-- Students (each user is a student)
-- =====================
INSERT INTO "Student" ("id", "userId", "graduationYear", "createdAt", "updatedAt") VALUES
  ('s1', 'u1', 2027, NOW(), NOW()),
  ('s2', 'u2', 2028, NOW(), NOW()),
  ('s3', 'u3', 2027, NOW(), NOW());

-- =====================
-- Clubs
-- =====================
INSERT INTO "Club" ("id", "name", "description", "roomNumber", "photoUrl", "startDate", "Frequency", "Weekdays", "links", "location", "tags", "teacherAdvisor", "createdAt", "updatedAt") VALUES
  ('c1', 'Robotics Club',  'Build and program robots for competitions.',       '204',         'https://placehold.co/400x200', '2026-01-13T00:00:00Z', 1, ARRAY['Monday','Wednesday'], ARRAY[]::TEXT[], 1, ARRAY['STEM','Engineering'],  'Mr. Roberts',  NOW(), NOW()),
  ('c2', 'Key Club',       'Community service and leadership organization.',   '118',         'https://placehold.co/400x200', '2026-01-14T00:00:00Z', 2, ARRAY['Tuesday'],            ARRAY[]::TEXT[], 2, ARRAY['Service','Leadership'], 'Ms. Chen',     NOW(), NOW()),
  ('c3', 'Drama Club',     'Perform plays, improv, and stage productions.',    'Auditorium',  'https://placehold.co/400x200', '2026-01-15T00:00:00Z', 1, ARRAY['Thursday','Friday'],  ARRAY[]::TEXT[], 3, ARRAY['Arts','Theater'],       'Mrs. Patel',   NOW(), NOW());

-- =====================
-- Club members (_StudentClubs: A=Club, B=Student)
-- =====================
INSERT INTO "_StudentClubs" ("A", "B") VALUES
  ('c1', 's1'),  -- Alice in Robotics
  ('c1', 's2'),  -- Bob in Robotics
  ('c2', 's1'),  -- Alice in Key Club
  ('c2', 's3'),  -- Charlie in Key Club
  ('c3', 's3');  -- Charlie in Drama

-- =====================
-- Club officers (_ClubOfficers: A=Club, B=Student)
-- =====================
INSERT INTO "_ClubOfficers" ("A", "B") VALUES
  ('c1', 's1'),  -- Alice is Robotics officer
  ('c2', 's3'),  -- Charlie is Key Club officer
  ('c3', 's3');  -- Charlie is Drama officer

-- =====================
-- Announcements
-- =====================
INSERT INTO "Announcement" ("id", "title", "content", "images", "clubId", "posterId", "createdAt", "updatedAt") VALUES
  ('a1', 'Weekly Meeting Cancelled',  'This week''s meeting is cancelled due to the holiday.',                                         ARRAY[]::VARCHAR[], 'c1', 's1', NOW(), NOW()),
  ('a2', 'Bake Sale Fundraiser',      'Join us Friday for our annual bake sale! All proceeds go to competition fees.',                 ARRAY[]::VARCHAR[], 'c2', 's3', NOW(), NOW()),
  ('a3', 'New Members Welcome',       'Open enrollment is here. Stop by to sign up!',                                                  ARRAY[]::VARCHAR[], 'c3', 's3', NOW(), NOW()),
  ('a4', 'Competition Results',        'We placed 2nd at the regional robotics competition. Great job team!',                           ARRAY[]::VARCHAR[], 'c1', 's1', NOW(), NOW()),
  ('a5', 'Spring Play Auditions',      'Auditions for the spring play will be held next Thursday and Friday after school.',             ARRAY[]::VARCHAR[], 'c3', 's3', NOW(), NOW());
