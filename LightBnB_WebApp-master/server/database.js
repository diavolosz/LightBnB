const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg')



const pool = new Pool({
  host: 'localhost',
  user: 'vagrant',
  password: '123',
  database: 'lightbnb',
})


/// Users

// function to one to retrieve user email by searching for user id 
const getUserWithEmail = function(email) {
  const queryString = `SELECT * 
                       FROM users 
                       WHERE email = $1;`
  return pool
    .query(queryString, [email.toLowerCase()])
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithEmail = getUserWithEmail;



// function to one to retrieve user by searching for user id 
const getUserWithId = function(id) {
  const queryString = `SELECT * 
                       FROM users 
                       WHERE id = $1;`
  return pool
    .query(queryString, [id])
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithId = getUserWithId;



// function to allow user to sign up
const addUser =  function(user) {

  const name = user.name
  const password = user.password
  const email = user.email
  const queryString = `INSERT INTO users (name, password, email)
                       VALUES ($1, $2, $3)
                       RETURNING*;`
  return pool 
    .query(queryString,[name, password, email.toLocaleLowerCase()])
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addUser = addUser;



/// Reservations

// function to allow user to retrieve reservation made 
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `SELECT properties.*,
                              reservations.*,
                              AVG(property_reviews.rating) as average_rating 
                        FROM properties
                        JOIN reservations ON properties.id = reservations.property_id
                        JOIN property_reviews ON properties.id = property_reviews.property_id
                        WHERE
                          reservations.guest_id = $1 AND
                          reservations.end_date < now()::date
                        GROUP BY reservations.id, properties.id
                        ORDER BY reservations.start_date
                        LIMIT $2;`

  return pool 
  .query(queryString,[guest_id, limit])
  .then((result) => {
    return result.rows
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getAllReservations = getAllReservations;



/// Properties

// function to allow user to retrieve avaliable properties by filter
 const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
       SELECT properties.*, avg(property_reviews.rating) as average_rating
       FROM properties
       JOIN property_reviews ON property_reviews.property_id = properties.id
       `;

   if (options.city) {
     queryParams.push(`%${options.city}%`);
     queryString += `WHERE city LIKE $${queryParams.length} `;
   }

   if (options.owner_id) {
     queryParams.push(`${options.owner_id}`);
     if (!queryParams.length) {
     queryString += `WHERE owner_id = $${queryParams.length} `;
     } else {
       queryString += `AND owner_id = $${queryParams.length} `;
     }
   }

   if (options.minimum_price_per_night) {
     let min = options.minimum_price_per_night * 100;
     queryParams.push(`${min}`);
     if (!queryParams.length) {
     queryString += `WHERE cost_per_night >= $${queryParams.length} `;
     } else {
       queryString += `AND cost_per_night >= $${queryParams.length} `;
     }
   }

   if (options.maximum_price_per_night) {
     let max = options.maximum_price_per_night * 100;
     queryParams.push(`${max}`);
     if (!queryParams.length) {
       queryString += `WHERE cost_per_night <= $${queryParams.length} `;
     } else {
       queryString += `AND cost_per_night <= $${queryParams.length} `;
     }
   }

   queryString += `GROUP BY properties.id`;

   if (options.minimum_rating) {
     queryParams.push(`${options.minimum_rating}`);
     queryString += `
     HAVING avg(rating) >= $${queryParams.length} `;
   }

   queryParams.push(limit);
   queryString += `
       ORDER BY cost_per_night
       LIMIT $${queryParams.length};`;

   return pool.query(queryString, queryParams).then((res) => {
    return res.rows})
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;



// function to allow user to add property for listing 
const addProperty = function(property) {

  const queryParams = [
    property['owner_id'],
    property['title'],
    property['description'],
    property['thumbnail_photo_url'],
    property['cover_photo_url'],
    property['cost_per_night'],
    property['street'],
    property['city'],
    property['province'],
    property['post_code'],
    property['country'],
    property['parking_spaces'] || null,
    property['number_of_bathrooms'] || null,
    property['number_of_bedrooms' || null]
  ];
  const queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                       RETURNING*;`
  return pool 
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addProperty = addProperty;
