import { jsPDF } from 'jspdf'
import "jspdf-autotable";

export function generatePdfFile(scheduleData, teacherData) {
    var doc = new jsPDF({ orientation: "l" });

    const styles = {
        font: "Helvetica", // Font style
        fontSize: 10, // Font size
        fillColor: [255, 255, 255], // Background color
        textColor: [0, 0, 0], // Text color
        padding: 0.1, // Cell padding (in units declared at jsPDF instantiation)
        lineColor: [0, 0, 0], // Cell border color
        lineWidth: 0.1, // Cell border width
        valign: "middle", // Vertical alignment
        halign: "center", // Horizontal alignment
    };

    function calculateColSpan(yearIndex) {
        return Math.ceil(
            Math.ceil(
                scheduleData.noOfBlocksPerYear[
                scheduleData.selectedYears[yearIndex]
                ] * scheduleData.paperSlotsPerDay
            )
        );
    }

    scheduleData.yearSchedule.forEach((year, yearIndex) => {
        var headersData = [];
        var bodyRow = [];
        console.log("page", yearIndex + 1);
        doc.setFontSize(16);
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getStringUnitWidth(`Year ${yearIndex + 1} Schedule`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textX = (pageWidth - textWidth) / 2;
        doc.text(textX, 15, `${scheduleData.selectedYears[yearIndex]} Schedule`);
        const days = [
            { content: "Teacher Name", rowSpan: 3 },
            ...year.headers.days.map((value) => ({
                content: value,
                colSpan: calculateColSpan(yearIndex),
            })),
        ];

        const subjects = year.headers.subjects.map((value) => ({
            content: value,
            colSpan: calculateColSpan(yearIndex),
        }));

        const blocks = year.headers.blocks.map((value) => ({ content: value }));

        Object.keys(year.schedule).forEach(function (index) {
            const row = [
                teacherData.find((teacher) => teacher.teacherId == index).name,
                ...year.schedule[index].map((value) => (value ? 1 : "")),
            ];
            bodyRow.push(row);
        });

        headersData.push(days, subjects, blocks);

        doc.autoTable({
            head: headersData,
            body: bodyRow,
            theme: "grid",
            styles: styles,
            startY: 20,
            margin:5

        });

        if (yearIndex < (scheduleData.yearSchedule.length - 1)) {

            doc.addPage();
        }
    });

    doc.save("table1.pdf");
}