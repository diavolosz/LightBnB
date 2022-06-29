INSERT INTO users (id, name, email, password) 
  VALUES (1, 'Devin Sanders', 'tristanjacobs@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, name, email, password) 
  VALUES (2, 'Ana Harrison', 'allisonjackson@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (id, name, email, password) 
  VALUES (3, 'Lloyd Jefferson', 'asherpoole@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');



INSERT INTO properties (id, title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
  VALUES (1, 'Hobbit hole', 'description', 1, 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 10787, 2, 8, 2, true, 'Northwest Territories', 'Town of Hay River', 'Canada', '233 Into Loop', '83680');
INSERT INTO properties (id, title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
  VALUES (2, 'High ground', 'description', 2, 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 23691, 3, 5, 1, true, 'Ontario', 'Haldimand-Norfork', 'Canada', '32 Ubda Ridge', '44583');
INSERT INTO properties (id, title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
  VALUES (3, 'Bear cave', 'description', 3, 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 69790, 1, 2, 6, true, 'Newfoundland', 'Corner Brook', 'Canada', '511 Dopo Loop', '38051');



INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) 
  VALUES (1, 1, 1, '2018-09-11', '2018-09-26 ');
INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) 
  VALUES (2, 2, 2, '2019-01-04', '2019-02-01');
INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) 
  VALUES (3, 3, 3, '2021-10-01', '2021-10-14');



INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) 
  VALUES (1, 1, 1, 1, 4, 'messages');
INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) 
  VALUES (2, 2, 2, 2, 5, 'messages');
INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) 
  VALUES (3, 3, 3, 3, 4, 'messages');