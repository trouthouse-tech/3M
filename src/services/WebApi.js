import axios from 'axios';
const BASE_URL = "https://api.tradier.com";
const APP_TOKEN = "Dc6hQbtgHxxs7yTfmNbJMtp1rLAX";
export default class WebApi {


    // POST Request
    // async post(apiParameter, data) {
    //     try {
    //         let url = BASE_URL + apiParameter;
    //         return await axios.post(url, data);
    //     } catch (error) {
    //         let err = [];
    //         err.error = error;
    //         err.no_result = true;
    //         return err;
    //     }
    // }

    async getRequest(apiParameter, paramQuery, token) {
            try {
                let url = BASE_URL + apiParameter;
                return await axios.get(url, {
                    params: paramQuery,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });
            } catch (error) {
                let err = [];
                err.error = error;
                err.no_result = true;
                return err;
            }
        }
        // async update(apiParameter, data) {

    //     try {
    //         let url = BASE_URL + apiParameter;
    //         return await axios.put(url, data);
    //     } catch (error) {
    //         let err = [];
    //         err.error = error;
    //         err.no_result = true;
    //         return err;
    //     }
    // }

    // async delete(apiParameter) {
    //     try {
    //         let url = BASE_URL + apiParameter;
    //         return await axios.delete(url);
    //     } catch (error) {
    //         let err = [];
    //         err.error = error;
    //         err.no_result = true;
    //         return err;
    //     }
    // }

    // signUp(jsonObject) {
    //     //  console.log("signup function of logincalls has been called",jsonObject)
    //     let apiParameter = '/users/signup';
    //     return this.post(apiParameter, jsonObject,);
    // }

    // signIn(jsonObject) {
    //     let apiParameter = '/users/login';
    //     return this.post(apiParameter, jsonObject)
    // }
    // // taking email from user to send password resend code
    // fotgotPasswordEmail(jsonObject) {
    //     let apiParameter = "/users/forgotpasswordemail";
    //     return this.post(apiParameter, jsonObject)
    // }
    // //verify the code emailed to user
    // verifyCode(jsonObject) {
    //     let apiParameter = "/users/verifycode";
    //     return this.post(apiParameter, jsonObject)
    // }
    // //update user password
    // updatePassword(jsonObject) {
    //     let apiParameter = "/users/resetpassword";
    //     return this.post(apiParameter, jsonObject)
    // }
    // updateUserProfile(formdata) {
    //     let apiParameter = "/users/updateprofile";
    //     return this.post(apiParameter, formdata)
    // }
    // //not this is used for creation of both "Practice test as well as Brain Update Test"
    // createTest(jsonObject) {
    //     let apiParameter = "/test/createtest";
    //     return this.post(apiParameter, jsonObject)
    // }

    // //get all questions
    // getAllTests(user_id) {
    //     let apiParameter = `/test/search/${user_id}`;
    //     return this.get(apiParameter);
    // }

    // getAllQuestions(user_id, test_id) {
    //     let apiParameter = `/test/group/questions/${user_id}/${test_id}`;
    //     return this.get(apiParameter);
    // }

    // updateFavourite(user_id, test_id, data) {
    //     let apiParameter = `/test/updateFavourite/${user_id}/${test_id}`;
    //     return this.update(apiParameter, data)
    // }
    // deleteTest(user_id, test_id, type) {
    //     let apiParameter = `/test/delete_test/${user_id}/${test_id}/${type}`;
    //     return this.delete(apiParameter)
    // }
    // getFavouriteTests(user_id) {

    //     let apiParameter = `/test/favourite_test/${user_id}`;
    //     return this.get(apiParameter)
    // }

    // getTestsByDate(user_id, fromdate, todate) {
    //     let apiParameter = `/test/test_by_date/${user_id}/${fromdate}/${todate}`;
    //     return this.get(apiParameter)
    // }

    // getTestsBySubject(user_id, search) {

    //     let apiParameter = `/test/subject_tests/${user_id}/${search}`;
    //     return this.get(apiParameter)
    // }
    // getTestsByReference(user_id, reference_type) {
    //     let apiParameter = `/test/reference_test/${user_id}/${reference_type}`;
    //     return this.get(apiParameter)
    // }


    // getTestQuestions(user_id, test_id, test_type) {
    //     let apiParameter = `/test/group/questions/${user_id}/${test_id}/${test_type}`;
    //     return this.get(apiParameter)
    // }
    // updateTest(data) {
    //     let apiParameter = `/test/updateTest`;
    //     return this.update(apiParameter, data)
    // }

    getQuotes(query) {
            let apiParameter = `/v1/markets/quotes`;
            let paramQ = {
                symbols: query.toUpperCase(),
            }
            return this.getRequest(apiParameter, paramQ, APP_TOKEN)
        }
        //end of the class

}