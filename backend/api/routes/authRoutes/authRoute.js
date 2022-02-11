import express from 'express'
import * as authController from '../../controllers/authController/authController.js'
import verifySignUpDetails from '../../middlewares/verifySignUpDetails.js'

const router = express.Router();
/**
 * all auth urls will here here
 * get      - get all data
 * post     - add new data
 * put      - update on existing data
 * delete   - delete the data from db
 */

router.route('/signup')
   .post(
      verifySignUpDetails.checkForDuplicateUnameEmail,
      authController.signup)

router.route('/login')
   .post(
      verifySignUpDetails.checkExistingUser,
      authController.login)

export default router