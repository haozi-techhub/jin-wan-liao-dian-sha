import type { WheelInputSectionProps } from '@/types/wheel';

export default function WheelInputSection({
  inputValue,
  tooltipVisible,
  infoIconRef,
  tooltipRef,
  onInputChange,
  onToggleTooltip,
  onShowTooltip,
  onHideTooltip,
  onStart,
  isVisible
}: WheelInputSectionProps) {
  return (
    <div id="playerInputSection" style={{ display: isVisible ? 'block' : 'none' }}>
      <p style={{ marginBottom: 15, color: '#aaa' }}>
        输入至少 2 个选项，每行一个
        <span
          ref={infoIconRef}
          className="info-icon"
          onClick={onToggleTooltip}
          onMouseEnter={onShowTooltip}
          onMouseLeave={onHideTooltip}
          title="查看选项说明"
        >
          ℹ️
        </span>
        <span ref={tooltipRef} className={`tooltip ${tooltipVisible ? 'show' : ''}`} id="optionsTooltip">
          可以填朋友的名字、想吃的东西，或者今晚想做的事。
        </span>
      </p>

      <textarea
        id="playerNamesInput"
        aria-label="转盘选项，每行一个"
        placeholder={'选项一\n选项二\n选项三'}
        value={inputValue}
        onChange={(event) => onInputChange(event.target.value)}
      />
      <button onClick={onStart}>生成转盘</button>
    </div>
  );
}
