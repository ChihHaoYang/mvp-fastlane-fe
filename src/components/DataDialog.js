import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import styles from '../../styles/dialog.module.css'

function DataDialog(props) {
  const { open, onClose, data } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>資料詳細</DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            {
              data && Object.keys(data).filter(key => ['_id', 'category'].indexOf(key) === -1).map(ele => (
                <TableRow key={ele.id}>
                  <TableCell className={styles.key}>{ele}</TableCell>
                  <TableCell className={styles.value}>{data[ele]}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DataDialog