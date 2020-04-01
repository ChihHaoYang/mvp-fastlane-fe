import fetch from 'isomorphic-fetch'
import { OPEN_DATA_URL_GOV, TABLE_HEAD_ROWS, DATASET_LIST } from '../../constants'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

function renderDataRowCell(data) {
  if (!data) return null
  const fileTypeList = (data['檔案格式'] || '').split(';')
  const links = data['下載連結'].split(';').map((ele, index) => ({
    link: ele,
    ext: fileTypeList[index]
  }))
  return (
    <TableRow>
      <TableCell>{data['資料集名稱']}</TableCell>
      <TableCell>{data['資料集描述']}</TableCell>
      <TableCell>{data['主要欄位說明']}</TableCell>
      <TableCell>{data['提供機關']}</TableCell>
      <TableCell>{data['修訂時間']}</TableCell>
      <TableCell>
        {
          links.map(ele => (<a href={ele.link}>{ele.ext}</a>))
        }
      </TableCell>
    </TableRow>
  )
}

function Dataset(props) {
  console.log(props)
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_HEAD_ROWS.map(ele => (<TableCell key={ele.id}>{ele.name}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map(ele => renderDataRowCell(ele))}
        </TableBody>
      </Table>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: DATASET_LIST.map(ele => ({ params: { id: ele.id.toString() } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${OPEN_DATA_URL_GOV}?type=dataset&order=downloadcount&qs=&uid=&tag=dtid%3A${params.id}`)
  const list = await res.json()
  return {
    props: {
      list,
    },
  }
}

export default Dataset