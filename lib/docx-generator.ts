import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";
import { ResumeData } from "./types";
import { saveAs } from "file-saver";

export const generateDocx = async (data: ResumeData) => {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                // Header
                new Paragraph({
                    text: data.personalInfo.fullName,
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 },
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: data.personalInfo.email, break: 0 }),
                        new TextRun({ text: ` | ${data.personalInfo.phone}`, break: 0 }),
                        new TextRun({ text: ` | ${data.personalInfo.linkedin}`, break: 0 }),
                        new TextRun({ text: ` | ${data.personalInfo.website}`, break: 0 }),
                    ],
                    spacing: { after: 400 },
                }),

                // Summary
                ...(data.personalInfo.summary ? [
                    new Paragraph({
                        text: "Professional Summary",
                        heading: HeadingLevel.HEADING_2,
                        border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } },
                        spacing: { before: 400, after: 200 },
                    }),
                    new Paragraph({
                        text: data.personalInfo.summary,
                        spacing: { after: 400 },
                    }),
                ] : []),

                // Experience
                ...(data.experience.length > 0 ? [
                    new Paragraph({
                        text: "Experience",
                        heading: HeadingLevel.HEADING_2,
                        border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } },
                        spacing: { before: 400, after: 200 },
                    }),
                    ...data.experience.flatMap(exp => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: exp.position, bold: true, size: 28 }),
                                new TextRun({ text: ` at ${exp.company}`, bold: true, italics: true }),
                            ],
                            spacing: { before: 200 },
                        }),
                        new Paragraph({
                            text: `${exp.startDate} - ${exp.endDate}`,
                            alignment: AlignmentType.RIGHT,
                            spacing: { after: 100 },
                        }),
                        new Paragraph({
                            text: exp.description,
                            spacing: { after: 300 },
                        }),
                    ]),
                ] : []),

                // Education
                ...(data.education.length > 0 ? [
                    new Paragraph({
                        text: "Education",
                        heading: HeadingLevel.HEADING_2,
                        border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } },
                        spacing: { before: 400, after: 200 },
                    }),
                    ...data.education.flatMap(edu => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: edu.institution, bold: true }),
                                new TextRun({ text: ` - ${edu.degree}` }),
                            ],
                            spacing: { before: 200 },
                        }),
                        new Paragraph({
                            text: edu.graduationDate,
                            alignment: AlignmentType.RIGHT,
                            spacing: { after: 300 },
                        }),
                    ]),
                ] : []),

                // Skills
                ...((data.skills.languages?.length || data.skills.frameworks?.length || data.skills.tools?.length) ? [
                    new Paragraph({
                        text: "Skills",
                        heading: HeadingLevel.HEADING_2,
                        border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } },
                        spacing: { before: 400, after: 200 },
                    }),
                    new Paragraph({
                        children: [
                            ...(data.skills.languages?.length ? [new TextRun({ text: "Languages: ", bold: true }), new TextRun({ text: data.skills.languages.join(", ") + "\n" })] : []),
                            ...(data.skills.frameworks?.length ? [new TextRun({ text: "Frameworks: ", bold: true }), new TextRun({ text: data.skills.frameworks.join(", ") + "\n" })] : []),
                            ...(data.skills.tools?.length ? [new TextRun({ text: "Tools: ", bold: true }), new TextRun({ text: data.skills.tools.join(", ") })] : []),
                        ],
                    }),
                ] : []),
            ],
        }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.docx`);
};
