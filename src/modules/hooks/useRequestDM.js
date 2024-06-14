import { chatList } from 'modules/actions/chat';
import { useDispatch } from 'react-redux';

export default function useRequestDM(text, type) {
  return chatList({
    inType: type, // 'param',
    inStr: text,
  });
}

// export function useFetchEvents(sentence) {
//   const dispatch = useDispatch();

//   // return () => {
//   dispatch(
//     chatList({
//       inType: 'param', // 'param',
//       inStr: sentence,
//     })
//   );
//   // };
// }
