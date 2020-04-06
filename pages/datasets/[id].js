import fetch from 'isomorphic-fetch'
import { useState } from 'react'
import { OPEN_DATA_URL_GOV, TABLE_HEAD_ROWS, DATASET_LIST } from '../../constants'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import styles from '../../styles/dataset.module.css'
import DataDialog from '../../src/components/DataDialog'
import Button from '@material-ui/core/Button'

function renderDataRowCell(data, onClick) {
  if (!data) return null
  const fileTypeList = (data['檔案格式'] || '').split(';')
  const links = data['下載連結'].split(';').map((ele, index) => ({
    link: ele,
    ext: fileTypeList[index]
  }))
  return (
    <TableRow key={data.id} className={styles.tableRow} onClick={() => { onClick(data) }}>
      <TableCell>{data['資料集名稱']}</TableCell>
      <TableCell>{data['資料集描述']}</TableCell>
      <TableCell className={styles.docCell}>{data['主要欄位說明']}</TableCell>
      <TableCell>{data['提供機關']}</TableCell>
      <TableCell>{data['修訂時間']}</TableCell>
      <TableCell>
        {
          links.map(ele => (
            <Button
              color="secondary"
              variant="contained"
              size="small"
              href={ele.link}
              key={ele.link
              }
            >
              {ele.ext}
            </Button>
          ))
        }
      </TableCell>
    </TableRow>
  )
}

function Dataset(props) {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [currentData, setCurrentData] = useState(null)

  function onDialogOpen(data) {
    setOpen(true)
    setCurrentData(data)
  }

  function onDialogClose() {
    setOpen(false)
    setTimeout(() => {
      setCurrentData(null)
    }, 500)
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow className={styles.tableHead}>
            {TABLE_HEAD_ROWS.map(ele => (<TableCell key={ele.id}>{ele.name}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map((ele, index) => renderDataRowCell(ele, onDialogOpen))}
        </TableBody>
      </Table>
      <DataDialog
        open={open}
        onClose={onDialogClose}
        data={currentData}
      />
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
  const res = await fetch(`${OPEN_DATA_URL_GOV}?type=dataset&order=downloadcount&qs=&uid=&tag=dtid%3A${params.id}`).catch(err => {
    return { success: false, error: err }
  })

  if (!res.success) {
    // Use backup data
    const backup = await fetch(`http://localhost:8080/datasets/${params.id}`).catch(err => {
      return { success: false, error: err }
    })
    const backupRes = await backup.json()
    return {
      props: {
        list: backupRes.success ? backupRes.data : [],
      },
    }
  }

  const list = await res.json()
  return {
    props: {
      list,
    },
  }
}

export default Dataset