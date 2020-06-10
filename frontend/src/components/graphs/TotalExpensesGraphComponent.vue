<script>
import { Line } from "vue-chartjs";

/* RGB Colors, Name */
const colors = [
  [[0, 255, 0], "Lime"],
  [[0, 0, 255], "Blue"],
  [[255, 0, 0], "Red"],
  [[128, 0, 0], "Maroon"],
  [[0, 128, 0], "Green"],
  [[0, 0, 128], "Navy"],
  [[255, 0, 255], "Fuchsia"]
  [[0, 255, 255], "Aqua"],
  [[0, 128, 128], "Teal"],
];

window.colors = colors;

export default {
  extends: Line,
  name: "TotalExpensesGraphComponent",
  mounted() {
    this.getData(this.showTables);
  },
  methods: {
    getData(callback) {
      fetch("/api/graph")
        .then(r => r.json())
        .then(callback);
    },

    showTables(data) {
      const categories = {};
      const currentColors = [...colors];
      let val = 0;
      let i=0;
      let currentColor;
      for (const d of data) {
        let obj = categories[d.categoryid];
        if (!obj) {
          currentColor = currentColors[i][0];
          i++;
          val = 0;

          obj = categories[d.categoryid] = {
            name: d.cname,
            amounts: [],
            colors: []
          };
        }

        val += d.amount;
        
        obj.amounts.push({
          y: val,
          t: new Date(d.createdat),
          label: d.description
        });
        obj.colors.push(
          `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, 1)`
        );
      }

      const arr = Object.values(categories);
      this.renderChart(
        {
          datasets: arr
            .map(x => ({
              label: x.name,
              data: [...x.amounts].sort((a, b) => (a.t > b.t ? 1 : -1)),
              borderColor: x.colors,
              lineTension: 0.1,
              backgroundColor: "transparent"
            }))
            .sort((a, b) => (a.label > b.label ? 1 : -1))
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          bezierCurve: false,
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "day"
                }
              }
            ]
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
