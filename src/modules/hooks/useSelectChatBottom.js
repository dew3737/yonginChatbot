import { useEffect } from 'react';

import scroll from 'modules/utils/scroll';
/**
 * 채팅방의 position bottom으로 이동
 */
const useSelectChatBottom = () => {
  useEffect(() => {
    scroll();
  });
};

export default useSelectChatBottom;
