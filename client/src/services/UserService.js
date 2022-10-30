import { sha512 } from 'crypto-hash';

async function EncryptForm(form) {
    const new_form = {...form};
    new_form.password = await sha512(new_form.password);
    return new_form;
}

const UserService = {
    EncryptForm
};

export default UserService;