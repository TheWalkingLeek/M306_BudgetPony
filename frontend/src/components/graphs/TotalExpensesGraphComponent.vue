<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  name: "TotalExpensesGraphComponent",
  mounted() {
    this.getData(this.showTables);
  },
  methods: {
    getData(callback) {
      fetch("/api/graph/" + 1 /* UserId */)
        .then(r => r.json())
        .then(callback);
    },

    showTables(data) {
      console.log(data);

      const categories = {};
      for (const d of data) {
        let obj = categories[d.categoryid];
        if (!obj)
          obj = categories[d.categoryid] = {
            name: d.description,
            budgets: [],
            amounts: []
          };

        obj.budgets.push(d.cbudget);
        obj.amounts.push(d.amount);
      }

      const arr = Object.values(categories);
      console.log(arr);
      this.renderChart(
        {
          datasets: [
            ...arr.map(x => ({
              label: x.name,
              data: x.amounts
            })),
            ...arr.map(x => ({
              label: x.name,
              data: x.budgets
            }))
          ]
        },
        { responsive: true }
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
