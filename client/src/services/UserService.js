import crypto from 'crypto';

async function EncryptForm(form) {
    const new_form = {...form};
    new_form.Password = await crypto.createHash('sha256').update(new_form.Password).digest("hex");
    return new_form;
}

const UserService = {
    EncryptForm
};

export default UserService;