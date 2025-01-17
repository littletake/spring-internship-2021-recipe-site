import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Recipe } from '../../types/recipe';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: 'flex',
      margin: theme.spacing(1),
      // width: '80%',
      // maxWidth: '60ch',
      backgroundColor: theme.palette.background.paper,
    },
    cover: {
      width: '100%',
    },
    content: {
      margin: theme.spacing(1),
    },
    inline: {
      display: 'inline',
    },
  }),
);

export type RecipePagePropType = {
  recipe: Recipe;
};
export const RecipePage: React.VFC<RecipePagePropType> = ({ recipe }) => {
  const classes = useStyles();

  return (
    //   TODO: ここのデザイン
    <div>
      {recipe && (
        <main className={classes.root}>
          <Card>
            {recipe.image_url && (
              <img
                className={classes.cover}
                src={recipe.image_url}
                alt="レシピ画像"
              />
            )}

            <CardContent className={classes.content}>
              <Typography variant="h5">{recipe.title}</Typography>
              <Typography variant="body1">{recipe.author.user_name}</Typography>

              {/* TODO: 日付表示を整える */}
              <Typography variant="body1">{recipe.published_at}</Typography>
              <Typography variant="body1">{recipe.description}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="材料"></CardHeader>
            <CardContent>
              <List>
                {recipe.ingredients.map((ing, i) => (
                  <div key={i}>
                    <ListItem alignItems="flex-start" key={i}>
                      {/* TODO: エラー処理を作る */}
                      <Grid container justify="space-between">
                        <Grid item>{ing.name}</Grid>
                        <Grid item>{ing.quantity}</Grid>
                      </Grid>
                    </ListItem>
                    <Divider component="li" />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="手順"></CardHeader>
            <CardContent>
              <List>
                {recipe.steps.map((step, i) => (
                  <div key={i}>
                    <ListItem alignItems="flex-start" key={i}>
                      {/* TODO: エラー処理を作る */}
                      <Grid container>
                        {i + 1}. {step}
                      </Grid>
                    </ListItem>
                    <Divider component="li" />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </main>
      )}
    </div>
  );
};
