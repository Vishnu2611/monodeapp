const bcrypt = require('bcrypt');

const hashpassword = async (password) => {
    return hash = await bcrypt.hash(password, 8);
}

const checkpassword = async (password,hash) => {
    return bool = await bcrypt.compare(password, hash);
}

module.export = {
    hashpassword: hashpassword,
    checkpassword: checkpassword
};