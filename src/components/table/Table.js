import { table, Component, thead, th, tr, tbody, td } from '../../utils/elements';

class Table extends Component {
  renderRow(row, index, array) {
    return tr({}, ...Object.keys(row).map((key) => td({}, row[key])))
  }

  renderTableHeader(item, index, array) {
    return th({}, col)
  }
  
  getTableHeaders() {
    const { renderTableHeader, columnList, rowData } = this.props;
    return (columnList || Object.keys(rowData[0]))
      .map(renderTableHeader || this.renderTableHeader)
  }
  
  getRows() {
    const { renderRow, rowData } = this.props;
    return rowData.map(renderRow || this.renderRow);
  }

  render() {
    return table(
      {},
      thead({}, ...this.getTableHeaders()),
      tbody({}, ...this.getRows())
    )
  }
}
