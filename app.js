let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn");

let turnO = true; // true = O's turn, false = X's turn

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnText.innerText = "Player X's Turn";
      turnO = false;
    } else {
      box.innerText = "X";
      turnText.innerText = "Player O's Turn";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const resetGame = () => {
  turnO = true;
  turnText.innerText = "Player O's Turn";
  enableBoxes();
  msgContainer.classList.add("hide");
    boxes.forEach((box) => {
    box.classList.remove("win");
  });
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.background = "#fff"; // reset winner highlight
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner, pattern) => {
  msg.innerText = `🎉 Winner: ${winner}`;
  msgContainer.classList.remove("hide");

  // Add glowing effect
  for (let idx of pattern) {
    boxes[idx].classList.add("win");
  }

  disableBoxes();
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      showWinner(val1, pattern);
      return;
    }
  }

  // Draw check
  let allFilled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") allFilled = false;
  });
  if (allFilled) {
    msg.innerText = "😲 It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
