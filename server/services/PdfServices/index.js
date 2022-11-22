import path from 'path';
import fs from "fs";
import hbs from 'handlebars';

async function CompileTemplate(template_name, data) {
    const base_path = process.cwd();
    const file_path = path.join(base_path, './PdfTemplates', `${template_name}.hbs`);
    const file_css_path = path.join(base_path, './PdfTemplates', `${template_name}.css`);
    const css = await fs.readFileSync(file_css_path, 'utf-8');
    const html = await fs.readFileSync(file_path, 'utf-8');    
    const doc = hbs.compile(html)({
        css: css,
        data
    });
    return doc;
}

async function CreatePdf(template_name, data) {
    return await CompileTemplate(template_name, data);
}

async function CreateAgreementPdf(agreement) {
    return await CreatePdf('agreement', agreement);
}

async function CreateServiceReportPdf(service_report) {
    return await CreatePdf('service_report', service_report);
}

const PdfService = {
    CreatePdf,
    CreateAgreementPdf,
    CreateServiceReportPdf
};

export default PdfService;