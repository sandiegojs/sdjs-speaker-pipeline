const app = require('../server');
            
function addAdmin(realm, newAdminName, newAdminEmail, newAdminPhone, adminTempPw) {
    console.log('this is newAdminName in remote method',newAdminName)
    console.log('this is this is newAdminEmail', newAdminEmail)
    console.log('this is this is newAdminPhone', newAdminPhone)
    console.log('this is this is adminTempPw', adminTempPw)
    console.log('this is this is realm', realm)

    return new Promise((resolve, reject) => {
console.log(1)
        if (realm == undefined) {
            console.log(222)
            resolve('Bad realm');
            return false;
        } 
        if (newAdminName == undefined) {
            console.log(222)
            resolve('Bad newAdminName');
            return false;
        } 
        
        if(newAdminEmail == undefined) {
            console.log(223)
            resolve('Bad newAdminEmail');
            return false;
        }

        if(newAdminPhone == undefined) {
        console.log(224)
            resolve('Bad newAdminPhone');
            return false;
        }
        if(adminTempPw == undefined) {
            console.log(224)
                resolve('Bad adminTempPw');
                return false;
            }

        const createNewAdmin = {
                "realm": "string",
                "username": `${newAdminName}`,
                "email": `${newAdminEmail}`,
                "password": `${newAdminPhone}`,
                "phone": `${adminTempPw}`
        }
        console.log(228, createNewAdmin)

            resolve(createNewAdmin);
            console.log(229)

    })
}
module.exports = { addAdmin };
