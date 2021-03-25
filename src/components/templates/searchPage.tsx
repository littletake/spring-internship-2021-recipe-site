import Link from 'next/link'
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import { Recipe } from 'src/types/recipe'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   display: 'flex',
      width: '100%',
      maxWidth: '60ch',
      backgroundColor: theme.palette.background.paper,
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    cover: {
      width: 150,
      height: 150,
    },
    content: {
      margin: theme.spacing(5),
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    inline: {
      display: 'inline',
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      width: '100%',
      margin: theme.spacing(1),
    },
    paging: {
      margin: theme.spacing(1),
    },
    pagingButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  }),
)

export type SearchPagePropType = {
  recipeList: Recipe[]
  onClickNext: () => void
  onClickPrev: () => void
}
export const SearchPage: React.VFC<SearchPagePropType> = ({
  recipeList,
  onClickNext,
  onClickPrev,
}) => {
  const classes = useStyles()

  return (
    <>
      <div>
        <List className={classes.root}>
          {recipeList.map((recipe) => (
            <div key={recipe.id}>
              <ListItem alignItems="flex-start" button key={recipe.id}>
                <ListItemAvatar>
                  <Avatar
                    className={classes.large}
                    src={`${recipe.image_url}`}
                  />
                </ListItemAvatar>

                {/* TODO: ページ遷移の部分、改良の余地あり */}
                <Link href={'recipes/' + recipe.id}>
                  {/* TODO: 文字のデザイン変更 */}
                  <ListItemText
                    className={classes.content}
                    primary={`${recipe.title}`}
                    secondary={`${recipe.description}`}
                  />
                </Link>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      </div>

      <div className={classes.pagingButton}>
        {/* TODO: 内容が保持されていなければ可視化されないようにする */}
        <Button
          className={classes.paging}
          variant="outlined"
          color="secondary"
          onClick={() => onClickPrev()}
        >
          前のページ
        </Button>

        {/* TODO: 同上 */}
        <Button
          className={classes.paging}
          variant="outlined"
          color="secondary"
          onClick={() => onClickNext()}
        >
          次のページ
        </Button>
      </div>
    </>
  )
}
