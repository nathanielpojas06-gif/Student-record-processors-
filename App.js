const students = [
      { id: 1, name: "Alice Smith", year: 1, course: "BSCS", grades: [85, 90, 88, 92], enrolled: true },
      { id: 2, name: "Bob Johnson", year: 2, course: "BSIT", grades: [78, 82, 80, 85], enrolled: true },
      { id: 3, name: "Charlie Brown", year: 3, course: "BSCS", grades: [92, 95, 94, 98], enrolled: true },
      { id: 4, name: "Diana Prince", year: 1, course: "BSIS", grades: [88, 91, 87, 90], enrolled: false },
      { id: 5, name: "Ethan Hunt", year: 4, course: "BSIT", grades: [70, 75, 72, 68], enrolled: true },
      { id: 6, name: "Fiona Gallagher", year: 2, course: "BSEMC", grades: [90, 91, 89, 93], enrolled: true },
      { id: 7, name: "George Clark", year: 3, course: "BSCS", grades: [65, 70, 68, 72], enrolled: false },
      { id: 8, name: "Hannah Abbott", year: 1, course: "BSIS", grades: [95, 96, 98, 94], enrolled: true },
      { id: 9, name: "Ian Malcolm", year: 4, course: "BSIT", grades: [82, 85, 88, 84], enrolled: true },
      { id: 10, name: "Julia Roberts", year: 2, course: "BSEMC", grades: [76, 79, 81, 78], enrolled: false },
      { id: 11, name: "Kevin Bacon", year: 3, course: "BSCS", grades: [88, 89, 90, 87], enrolled: true },
      { id: 12, name: "Laura Croft", year: 1, course: "BSIT", grades: [91, 93, 92, 96], enrolled: true },
      { id: 13, name: "Michael Scott", year: 4, course: "BSIS", grades: [60, 65, 58, 62], enrolled: false },
      { id: 14, name: "Nancy Wheeler", year: 2, course: "BSEMC", grades: [84, 86, 88, 85], enrolled: true },
      { id: 15, name: "Oscar Martinez", year: 3, course: "BSCS", grades: [93, 94, 96, 95], enrolled: true },
      { id: 16, name: "Pam Beesly", year: 1, course: "BSEMC", grades: [89, 90, 92, 91], enrolled: true },
      { id: 17, name: "Quentin Tarantino", year: 4, course: "BSIT", grades: [75, 78, 80, 77], enrolled: false },
      { id: 18, name: "Rachel Green", year: 2, course: "BSIS", grades: [81, 83, 85, 82], enrolled: true },
      { id: 19, name: "Steve Rogers", year: 3, course: "BSCS", grades: [87, 89, 91, 88], enrolled: true },
      { id: 20, name: "Tony Stark", year: 4, course: "BSIT", grades: [98, 99, 97, 100], enrolled: true },
      { id: 21, name: "Uma Thurman", year: 1, course: "BSEMC", grades: [83, 85, 82, 86], enrolled: false },
      { id: 22, name: "Victor Stone", year: 2, course: "BSCS", grades: [90, 92, 91, 94], enrolled: true },
      { id: 23, name: "Wanda Maximoff", year: 3, course: "BSIS", grades: [94, 96, 95, 97], enrolled: true },
      { id: 24, name: "Xavier Charles", year: 4, course: "BSIT", grades: [89, 91, 90, 93], enrolled: true },
      { id: 25, name: "Yara Greyjoy", year: 1, course: "BSEMC", grades: [72, 75, 78, 74], enrolled: false },
      { id: 26, name: "Zachary Levi", year: 2, course: "BSCS", grades: [80, 82, 84, 81], enrolled: true },
      { id: 27, name: "Arthur Dent", year: 3, course: "BSIT", grades: [], enrolled: true }, // Edge case: No grades
      { id: 28, name: "Bruce Wayne", year: 4, course: "BSIS", grades: [96, 98, 97, 99], enrolled: true },
      { id: 29, name: "Clark Kent", year: 1, course: "BSCS", grades: [91, 90, 93, 92], enrolled: true },
      { id: 30, name: "Diana Prince II", year: 2, course: "BSEMC", grades: [85, 87, 86, 88], enrolled: false }
    ];

    // ==========================================
    // CORE FUNCTIONS
    // ==========================================

    function getAverageGrade(student) {
      if (!student || !Array.isArray(student.grades) || student.grades.length === 0) {
        return 0;
      }
      const sum = student.grades.reduce((acc, curr) => acc + curr, 0);
      return Number((sum / student.grades.length).toFixed(2));
    }

    function getTopStudents(studentsArray, n) {
      if (!Array.isArray(studentsArray)) {
        throw new Error("Invalid input: students argument must be an array.");
      }
      if (typeof n !== "number" || n < 0) {
        throw new Error("Invalid input: n must be a non-negative number.");
      }

      return [...studentsArray]
        .map(s => ({ ...s, averageGrade: getAverageGrade(s) }))
        .sort((a, b) => b.averageGrade - a.averageGrade)
        .slice(0, n);
    }

    function groupByCourse(studentsArray) {
      if (!Array.isArray(studentsArray)) return {};

      return studentsArray.reduce((acc, student) => {
        const course = student.course || "Unassigned";
        if (!acc[course]) {
          acc[course] = [];
        }
        acc[course].push({ ...student });
        return acc;
      }, {});
    }

    function getEnrolledCount(studentsArray) {
      if (!Array.isArray(studentsArray)) return { enrolled: 0, notEnrolled: 0 };

      return studentsArray.reduce(
        (acc, student) => {
          if (student.enrolled) {
            acc.enrolled++;
          } else {
            acc.notEnrolled++;
          }
          return acc;
        },
        { enrolled: 0, notEnrolled: 0 }
      );
    }

    function findStudent(studentsArray, name) {
      if (!Array.isArray(studentsArray) || typeof name !== "string") return null;

      const found = studentsArray.find(
        s => s.name && s.name.toLowerCase() === name.toLowerCase()
      );

      return found ? { ...found } : null;
    }

    function getCourseAverages(studentsArray) {
      if (!Array.isArray(studentsArray) || studentsArray.length === 0) return [];

      const grouped = groupByCourse(studentsArray);

      const courseAverages = Object.keys(grouped).map(course => {
        const courseStudents = grouped[course];
        const totalAvg = courseStudents.reduce(
          (sum, s) => sum + getAverageGrade(s),
          0
        );
        const courseAvg = courseStudents.length ? totalAvg / courseStudents.length : 0;

        return {
          course: course,
          averageGrade: Number(courseAvg.toFixed(2))
        };
      });

      return courseAverages.sort((a, b) => b.averageGrade - a.averageGrade);
    }

    function exportSummary(studentsArray) {
      if (!Array.isArray(studentsArray) || studentsArray.length === 0) {
        return {
          totalStudents: 0,
          overallAverageGrade: 0,
          topPerformingStudent: null,
          courseBreakdown: []
        };
      }

      const totalStudents = studentsArray.length;
      const overallAvg =
        studentsArray.reduce((acc, s) => acc + getAverageGrade(s), 0) / totalStudents;
      
      const topStudent = getTopStudents(studentsArray, 1)[0] || null;
      const courseBreakdown = getCourseAverages(studentsArray);

      return {
        totalStudents,
        overallAverageGrade: Number(overallAvg.toFixed(2)),
        topPerformingStudent: topStudent
          ? { name: topStudent.name, averageGrade: topStudent.averageGrade }
          : null,
        courseBreakdown
      };
                                                                          }
      
