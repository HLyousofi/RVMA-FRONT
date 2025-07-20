
import { STATUS_CONFIG, COLOR_CLASSES} from '../data/statusConfig';

const StatusButton = ({ type = 'quote', status, handleStatusChange }) => {
  const currentConfig = STATUS_CONFIG[type]?.[status];

  if (!currentConfig || !currentConfig.nextStatus) {
    // return <span className="text-gray-500 text-sm">Statut final atteint</span>;
    return null;
  }
  const { nextStatus, label, baseColor } = currentConfig;
  const colorClasses = COLOR_CLASSES[baseColor] || COLOR_CLASSES.gray;

  return (
    <button
      onClick={() => handleStatusChange(nextStatus)}
      className={`${colorClasses} text-white dark:text-whit font-medium py-1 px-6 rounded text-sm `}>
      {label}
    </button>
  );
};
export default StatusButton;
