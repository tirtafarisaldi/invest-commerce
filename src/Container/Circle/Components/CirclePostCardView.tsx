import * as React from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import CirclePostCard, {type PostCardProps} from './CirclePostCard';
import {postCardDataBuilder} from '../utils/postCardDataBuilderDummy';
import {ACTION_TYPES} from 'src/Redux/constants/actionTypes';

const CirclePostCardView = () => {
  const [vote, setVote] = React.useState<number>(32);

  const upVote = React.useCallback(() => {
    setVote(vote + 1);
  }, [vote]);

  const downVote = React.useCallback(() => {
    setVote(vote - 1);
  }, [vote]);

  const {data} = postCardDataBuilder({
    vote,
    upVote,
    downVote,
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: ACTION_TYPES.CIRCLE.SHOW_FLOATING_CREATE_POST,
      payload: {
        showFloatingCreatePost: true,
      },
    });
  }, [dispatch]);

  return (
    <>
      <ScrollView>
        {data.map((dummy: PostCardProps, i) => (
          <CirclePostCard
            key={i}
            heading={dummy.heading}
            content={dummy.content}
            footer={dummy.footer}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default React.memo(CirclePostCardView);
