import { merge } from 'lodash';
import Card from './Card';
import Button from './Button';
import Typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Card(theme),
    Button(theme),
    Typography(theme),
  );
}
