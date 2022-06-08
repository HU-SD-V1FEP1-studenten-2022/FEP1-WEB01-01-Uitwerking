import Chart from 'chart.js/auto';
import SubjectService from '../service/subject_service';
import { transformJsonSubjectsToArray, determineLabels, determineCompletedEctsPerPeriode } from '../utils/subject-chart-utils';

const subjectService = new SubjectService();

function renderChart() {
  subjectService.getSubjects().then((subjects) => {
    const subjectsArray = transformJsonSubjectsToArray(subjects);
    const labels = determineLabels(subjectsArray);
    const data = determineCompletedEctsPerPeriode(subjectsArray, labels);

    const ctx = document.querySelector('#dashboard-chart');
    const dashboardChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'ECTS behaald',
            data,
            backgroundColor: 'rgb(153, 102, 255)',
            indexAxis: 'y',
          },
        ],
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      },
    });
  });
}

renderChart();
