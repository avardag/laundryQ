const db = require("../db/db");

const tableName = "users";

const selectableProps = [
  "id",
  "email",
  "first_name",
  "last_name",
  "is_activated",
  "city",
  "role",
  "address",
  "laundry_id",
  "postcode",
  "phone",
];

const timeout = 1000;

/**
 *
 * @param {number} id
 * @returns
 */
exports.findById = async function (id) {
  return await db
    .select(selectableProps)
    .from(tableName)
    .where({ id })
    .first()
    .timeout(timeout);
};

/**
 *
 * @param {string} email
 * @returns promise with User Object including password
 */
exports.findByEmail = async function (email) {
  return await db
    .select([...selectableProps, "password"])
    .from(tableName)
    .where({ email })
    .first()
    .timeout(timeout);
};

exports.find = async function (filtersObj) {
  return await db
    .select(selectableProps)
    .from(tableName)
    .where(filtersObj)
    .timeout(timeout);
};
/**
 *  Same as `find` but only returns the first match if >1 are found.
 * @param {*} filtersObj
 * @returns
 */
exports.findOne = async function (filtersObj) {
  return await db
    .select(selectableProps)
    .from(tableName)
    .where(filtersObj)
    .timeout(timeout)
    .then((results) => {
      if (!Array.isArray(results)) return results;

      return results[0];
    });
};

exports.findAll = async function () {
  return await db.select(selectableProps).from(tableName).timeout(timeout);
};

/**
 *
 * @param {{first_name: string, last_name: string, email:string, password: string, phone:string, activation_link: string, city:string, address:string, postcode:string,}} props
 * @returns
 */
exports.create = async function (props) {
  const [newUser] = await db
    .insert(props)
    .returning(selectableProps)
    .into(tableName)
    .timeout(timeout);
  return newUser;
};

/**
 *
 * @param {number} id
 * @param {{key:value}} props
 * @returns
 */
exports.update = async function (id, props) {
  const [updatedUser] = await db
    .update(props)
    .from(tableName)
    .where({ id })
    .returning(selectableProps)
    .timeout(timeout);
  return updatedUser;
};
