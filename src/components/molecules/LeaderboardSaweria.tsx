// components/molecules/LeaderboardSaweria.tsx
export const LeaderboardSupportButton = () => {
  const handleClick = () => {
    window.open("https://saweria.co/widgets/leaderboard?streamKey=02fb6af8d0948ee950b78eaa990c66f9", "_blank");
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-4 px-8 rounded-full hover:from-cyan-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg font-bold"
    >
      Leaderboard Support
    </button>
  );
};