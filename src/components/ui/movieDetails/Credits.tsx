import { iCredits } from '@/types';

export const Credits = ({ credits }: { credits: iCredits }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-5 py-10">
      {credits.cast?.length > 0 &&
        credits.cast.map(cast => (
          <div
            key={cast.id}
            className="bg-gray-300 border flex flex-col justify-between items-center border-gray-950 text-center rounded-b-3xl p-2"
          >
            <img
              className="w-[100px] sm:w-[200px] max-w-full"
              src={
                cast.profile_path
                  ? `https://www.themoviedb.org/t/p/w1280${cast.profile_path}`
                  : '/user.png'
              }
              alt={cast.name}
            />
            <div>
              <p className="mt-2 ">{cast.name}</p>
              <p>{cast.character}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
