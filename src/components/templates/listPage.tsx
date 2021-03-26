import Link from 'next/link';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { PagingLinks, Recipe } from 'src/types/recipe';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   display: 'flex',
      width: '100%',
      // maxWidth: '60ch',
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
);

export type SearchPagePropType = {
  recipeList: Recipe[];
  pagingLink?: PagingLinks;
};
export const ListPage: React.VFC<SearchPagePropType> = ({
  recipeList,
  pagingLink,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const onClickNext = async () => {
    if (pagingLink && pagingLink.next) {
      if (router.query.keyword === undefined) {
        const params = pagingLink.next.split('=');
        router.push({
          pathname: router.pathname,
          query: { page: params[params.length - 1] },
        });
      } else {
        const params = pagingLink.next.split('=');
        router.push({
          pathname: router.pathname,
          query: {
            keyword: router.query.keyword,
            page: params[params.length - 1],
          },
        });
      }
      window.scrollTo(0, 0);
    } else {
      return null;
    }
  };
  const onClickPrev = async () => {
    if (pagingLink && pagingLink.prev) {
      if (router.query.keyword === undefined) {
        if (router.query.page === String(2)) {
          router.push({
            pathname: router.pathname,
            query: { page: '' },
          });
        } else {
          const params = pagingLink.prev.split('=');
          router.push({
            pathname: router.pathname,
            query: { page: params[params.length - 1] },
          });
        }
      } else {
        if (router.query.page === String(2)) {
          router.push({
            pathname: router.pathname,
            query: {
              keyword: router.query.keyword,
              page: '',
            },
          });
        } else {
          const params = pagingLink.prev.split('=');
          router.push({
            pathname: router.pathname,
            query: {
              keyword: router.query.keyword,
              page: params[params.length - 1],
            },
          });
        }
      }
      window.scrollTo(0, 0);
    } else {
      return null;
    }
  };

  return (
    <>
      <div>
        <List className={classes.root}>
          {recipeList.map((recipe) => (
            <div key={recipe.id}>
              <Link href={'recipes/' + recipe.id}>
                <ListItem alignItems="flex-start" button key={recipe.id}>
                  <ListItemAvatar>
                    <Avatar
                      className={classes.large}
                      src={`${recipe.image_url}`}
                    />
                  </ListItemAvatar>

                  {/* TODO: ページ遷移の部分、改良の余地あり */}
                  {/* TODO: 文字のデザイン変更 */}
                  <ListItemText
                    className={classes.content}
                    primary={`${recipe.title}`}
                    secondary={`${recipe.description}`}
                  />
                </ListItem>
              </Link>
              <Divider />
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
  );
};
