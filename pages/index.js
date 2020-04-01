import Head from 'next/head'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { DATASET_LIST } from '../constants'
import Link from 'next/link'

function Home() {
  function renderCellContent(data) {

  }
  return (
    <div>
      <Grid container spacing={3}>
        {DATASET_LIST.map(ele => (
          <Grid key={ele.id} item xs={12} sm={4} md={3}>
            <Link href={`/datasets/${ele.id}`}>
              <a>
                <div className="grid-content">
                  {ele.name}
                </div>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
      <style jsx>{`
        .grid-content {
          padding: 2rem 0;
          text-align: center;
          margin: 1rem;
          cursor: pointer;
        }
        .grid-content:hover {
          background-color: #a2a2a2;
          color: #fff;
        }
        a {
          text-decoration: none;
          color: unset;
        }
      `}</style>
    </div>
  )
}

export default Home
