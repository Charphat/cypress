const { defineConfig } = require("cypress");
const fs = require('fs');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        commentCustomer({ filePath, customerIndex }) {
          try {
            let fileContent = fs.readFileSync(filePath, 'utf-8');
            let lines = fileContent.split('\n');

            // ค้นหาและ comment บรรทัดที่มีข้อมูลลูกค้าตาม index
            let currentIndex = 0;
            lines = lines.map((line) => {
              if (!line.startsWith('//') && currentIndex === customerIndex) {
                currentIndex++;
                return `// ${line}`;
              } else if (!line.startsWith('//')) {
                currentIndex++;
              }
              return line;
            });

            // เขียนข้อมูลกลับไปที่ไฟล์
            fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
            return null;
          } catch (error) {
            console.error(error);
            return null;
          }
        }
      });
    }
  }
};