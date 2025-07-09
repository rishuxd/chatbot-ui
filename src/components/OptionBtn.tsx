type Props = {
    options: string[];
    onSelect: (option: string) => void;
  };
  
  export default function OptionButtons({ options, onSelect }: Props) {
    return (
      <div className="flex flex-wrap gap-3 mt-4">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(opt)}
            className="bg-gradient-to-br from-blue-100 to-blue-300 text-blue-800 px-4 py-2 rounded-full text-base font-medium shadow hover:from-blue-200 hover:to-blue-400 hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }
  