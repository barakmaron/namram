import { sha512 } from 'js-sha512';

function EncryptForm(form) {
    const new_form = {...form};
    new_form.Password = sha512(new_form.Password);
    return new_form;
}

const UserService = {
    EncryptForm
};

export default UserService;