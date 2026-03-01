import { CardQuestion } from "./types";

export const MODEL_NAMES = {
  ANALYZE_IMAGE: "gemini-3.0-pro",
  EDIT_IMAGE: "gemini-2.5-flash",
};

export const QUESTIONS: CardQuestion[] = [
  {
    id: 1,
    content: "Khoảnh khắc nào bên nhau khiến bạn cảm thấy hạnh phúc nhất?",
    category: "deep",
  },
  {
    id: 2,
    content:
      "Nếu chúng ta có thể đi du lịch bất cứ đâu ngay bây giờ, bạn sẽ chọn đi đâu?",
    category: "fun",
  },
  {
    id: 3,
    content: "Một thói quen của đối phương mà bạn thấy đáng yêu nhất là gì?",
    category: "deep",
  },
  {
    id: 4,
    content: "Điều điên rồ nhất mà bạn muốn chúng ta cùng làm là gì?",
    category: "spicy",
  },
  {
    id: 5,
    content: "Bạn ấn tượng gì nhất về đối phương trong lần đầu gặp mặt?",
    category: "deep",
  },
  {
    id: 6,
    content: "Món ăn nào đối phương nấu (hoặc mua) mà bạn thích nhất?",
    category: "fun",
  },
  {
    id: 7,
    content:
      "Nếu mô tả mối quan hệ của chúng ta bằng một bài hát, đó sẽ là bài gì?",
    category: "fun",
  },
  {
    id: 8,
    content:
      "Bạn mong muốn thay đổi điều gì ở bản thân để tốt hơn cho mối quan hệ này?",
    category: "deep",
  },
  {
    id: 9,
    content: "Kỉ niệm buồn cười nhất của chúng ta là gì?",
    category: "fun",
  },
  {
    id: 10,
    content:
      "Điều gì ở đối phương khiến bạn tự hào nhất khi kể với người khác?",
    category: "deep",
  },
];
