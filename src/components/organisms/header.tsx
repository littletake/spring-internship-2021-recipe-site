import {
  createStyles,
  Link,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { SearchBar } from '../molecules/searchBar'

export type Header = {
  headerTitle: string
}

// export type HeaderPropType = {
//   searchWord: string
// }
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.background.default,
      margin: theme.spacing(1),
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
    },
    word: {
      display: 'flex',
    },
    searchBar: {
      display: 'flex',
      margin: theme.spacing(1),
    },
    input: {
      margin: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
)

export const Header: React.VFC<Header> = ({ headerTitle }) => {
  const classes = useStyles()

  return (
    <Toolbar className={classes.header}>
      <div className={classes.title}>
        <Link href={'/'} color="inherit">
          <Typography className={classes.word} variant="h5" noWrap>
            レシピ検索サイト
          </Typography>
        </Link>
        <Typography className={classes.word} variant="body1" noWrap>
          {headerTitle}
        </Typography>
      </div>

      <SearchBar
        classNameForm={classes.searchBar}
        classNameInput={classes.input}
        classNameButton={classes.button}
      />
    </Toolbar>
  )
}
