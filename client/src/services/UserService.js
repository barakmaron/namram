import { sha512 } from 'crypto-hash';

async function EncryptForm(form) {
    const new_form = {...form};
    new_form.Password = await sha512(new_form.Password);
    return new_form;
}

const UserService = {
    EncryptForm
};

export default UserService;