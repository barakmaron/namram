import child_process from 'child_process';
import util from 'util';

export default async function GetBackupDataBase() {
    const exec = util.promisify(child_process.exec);
    const { stdout } = await exec(`mysqldump -h ${process.env.DATABASE_HOST} -u ${process.env.DATABASE_USER} -p${process.env.DATABASE_PASSWORD} ${process.env.DATABASE}`);
    return stdout;
}