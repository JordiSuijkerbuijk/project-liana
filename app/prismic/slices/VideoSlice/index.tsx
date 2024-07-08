import autoMapping from '@/helpers/autoMapping';
import splitYoutube from '@/helpers/splitYoutube';
import VideoSlice, { VideoSliceProps } from '@/slices/VideoSlice';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import model from './model.json';

/**
 * Props for `VideoSlice`.
 */
export type VideoSlice = SliceComponentProps<Content.VideoSliceSlice>;

/**
 * Component for "VideoSlice" Slices.
 */
// const VideoSlice = ({ slice }: VideoSliceProps): JSX.Element => {
const Video = ({ slice }: VideoSlice): JSX.Element => {
  const props = autoMapping<VideoSliceProps>(slice, model);

  if (props?.youtube) {
    props.youtubeId = splitYoutube(props.youtube);
  }

  return <VideoSlice {...props} />;
};

export default Video;
