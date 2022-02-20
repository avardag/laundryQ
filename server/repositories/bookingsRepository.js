const db = require("../db/db");

const tableName = "bookings";

const selectableProps = [
  "id",
  "machine_id",
  "user_id",
  "datetime_till",
  "datetime_from",
  "pin",
];

const timeout = 1000;

/**
 *
 * @param {{machineId:number,dateTimeFrom:string,dateTimeTill:string,userId:number,pin:string}} props
 * @returns
 */
exports.create = async function (props) {
  const [newBooking] = await db
    .insert(props)
    .returning(selectableProps)
    .into(tableName)
    .timeout(timeout);
  return newBooking;
};

exports.getOneById = async function (id) {
  const [bookingToDelete] = await db
    .select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout);
  return bookingToDelete;
};

/**
 *
 * @param {{laundryId:number, date:string}} props
 * @returns Array of bookings starting from given date
 */
exports.findAllByLaundryIdFromDate = async function (props) {
  return await db
    .select(
      "bookings.id",
      "datetime_from",
      "datetime_till",
      "bookings.machine_id",
      "bookings.user_id",
      "users.first_name",
      "users.last_name"
    )
    .from(tableName)
    .join("machines", "bookings.machine_id", "=", "machines.id")
    .join("users", "bookings.user_id", "=", "users.id")
    .where({ "machines.laundry_id": props.laundryId })
    .andWhere("datetime_till", ">=", props.date)
    .orderBy("bookings.machine_id")
    .timeout(timeout);
};

/**
 *
 * @param {number} userId
 * @returns Array of bookings for specific user
 */
exports.findAllByUserId = async function (userId) {
  //select * from bookings join machines on bookings.machine_id = machines.id  where bookings.user_id = 7;
  return await db
    .select(
      "bookings.id",
      "datetime_from",
      "datetime_till",
      "bookings.machine_id",
      "bookings.pin",
      "bookings.created_at",
      "machines.laundry_id",
      "machines.number",
      "machines.size",
      "laundries.name",
      "laundries.address"
    )
    .from(tableName)
    .join("machines", "bookings.machine_id", "=", "machines.id")
    .join("laundries", "machines.laundry_id", "=", "laundries.id")
    .where({ "bookings.user_id": userId })
    .orderBy("bookings.datetime_from", "desc")
    .timeout(timeout);
};

exports.destroy = async function (id) {
  return await db.del().from(tableName).where({ id }).timeout(timeout);
};
