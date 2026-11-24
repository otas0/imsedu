/**
 * Classroom lab procedures keyed by simulation id.
 * English is the source language for comments. Student-facing strings are bilingual.
 * Shape: prepare, steps, and conclude, each { zh, en } string arrays.
 * zh and en on the object are those three parts in order, so the current
 * Introduce list (which reads procedure[lang]) still shows the full write-up.
 */

/** Build one lab procedure. Arrays may be 1+ strings.
 *  @param {string[]} prepareZh
 *  @param {string[]} prepareEn
 *  @param {string[]} stepsZh
 *  @param {string[]} stepsEn
 *  @param {string[]} concludeZh
 *  @param {string[]} concludeEn */
export function lab(prepareZh, prepareEn, stepsZh, stepsEn, concludeZh, concludeEn) {
  return {
    prepare: { zh: prepareZh, en: prepareEn },
    steps: { zh: stepsZh, en: stepsEn },
    conclude: { zh: concludeZh, en: concludeEn },
    zh: [...prepareZh, ...stepsZh, ...concludeZh],
    en: [...prepareEn, ...stepsEn, ...concludeEn],
  };
}

export const LAB_BY_SIM = {
  'ac-rms': lab(
    [
      '正弦交流电源示意、峰值电流 Im、峰值电压 Vm 和频率 f。',
      '有效值按同一正弦定义，先记下 Im 与 Vm，再看 Irms 与 Vrms。',
      '本模型只比较峰值和有效值，不接真实电网。',
    ],
    [
      'A sinusoidal AC sketch with peak current Im, peak voltage Vm, and frequency f.',
      'Record Im and Vm first, then the rms readouts from the same sine.',
      'This model compares peak and rms values only. It is not a mains supply.',
    ],
    [
      '按下播放，观察 i = Im sin(ωt) 在一个周期内正负对称。',
      '记下 Irms 与 Vrms，对照 Irms = Im/√2 和 Vrms = Vm/√2。',
      '只把 Im 加倍，确认 Irms 也加倍，比值仍是 1/√2。',
      '只改变 f，确认波形变密，但 Irms 与 Vrms 不随频率改变。',
      '再改 Vm，单独核对电压有效值，不要把 Im 和 Vm 混进同一个公式。',
    ],
    [
      'Press Play and watch i = Im sin(ωt) run positive and negative through one cycle.',
      'Record Irms and Vrms and check Irms = Im/sqrt(2) and Vrms = Vm/sqrt(2).',
      'Double only Im and confirm Irms doubles while the ratio stays 1/sqrt(2).',
      'Change only f. The wave packs tighter, but Irms and Vrms do not follow frequency.',
      'Change Vm alone and check the voltage rms without mixing Im into that line.',
    ],
    [
      '正弦交流的有效值是峰值除以 √2，电流和电压各自独立。',
      '频率改变周期，不改变 Im 与 Irms 的关系。',
    ],
    [
      'For a sine wave the rms value is the peak divided by sqrt(2), separately for current and voltage.',
      'Frequency changes the period. It does not change the link from Im to Irms.',
    ],
  ),

  'ampere-force': lab(
    [
      '匀强磁场中的直导线，B 与 I 垂直。',
      '记下 B、I、L，以及力的方向是否按右手定则标出。',
    ],
    [
      'A straight wire in a uniform field, with B perpendicular to I.',
      'Note B, I, L, and whether the force sense follows the right-hand rule.',
    ],
    [
      '读取 F，对照安培力 F = B I L。',
      '只增大 B，确认 F 同比增大，方向不变。',
      '只增大 L，确认 F 同比增大。',
      '把 I 改为相反符号，确认 F 反向，大小仍是 |B I L|。',
      '把 I 调到 0，确认力消失，因为公式里电流是因子。',
    ],
    [
      'Read F and check the Ampere force F = B I L.',
      'Increase only B and confirm F scales with it, sense unchanged.',
      'Increase only L and confirm F scales with length.',
      'Reverse the sign of I and confirm F reverses while the magnitude stays |B I L|.',
      'Set I to 0 and confirm the force vanishes, because current is a factor.',
    ],
    [
      'B 垂直于 I 时，力的大小是 B、I、L 的乘积。',
      '电流反向，右手定则给出的力也反向。',
    ],
    [
      'When B is perpendicular to I, the force magnitude is the product B I L.',
      'Reversing the current reverses the force given by the right-hand rule.',
    ],
  ),

  archimedes: lab(
    [
      '溢水杯、浸在液体中的物体，浸没比例可在画面上拖动。',
      '记下液体密度 ρ、物体体积 V 和当地 g。',
      '排开的体积按浸没比例计算，并作为溢水收集到的体积。',
    ],
    [
      'An overflow can and an object in liquid. Drag the submerged fraction on the stage.',
      'Note the liquid density ρ, object volume V, and local g.',
      'Displaced volume is the submerged fraction times V, and it is the volume the overflow collects.',
    ],
    [
      '拖动浸没比例，读取 Vdisp 和浮力 Fb。',
      '对照阿基米德原理 Fb = ρ_liquid g V_disp。',
      '把浸没比例调到 1，确认 Vdisp 等于物体体积。',
      '只改变液体 ρ，确认同一 Vdisp 下 Fb 正比于 ρ。',
      '把 g 改到较小的值，确认 Fb 随之减小，物体体积本身并不决定浮力。',
    ],
    [
      'Drag the submerged fraction and record Vdisp and the buoyant force Fb.',
      'Check Archimedes: Fb = ρ_liquid g V_disp.',
      'Set the submerged fraction to 1 and confirm Vdisp equals the object volume.',
      'Change only the liquid density and confirm Fb is proportional to ρ at the same Vdisp.',
      'Lower g and confirm Fb falls. Object volume alone does not set the force.',
    ],
    [
      '浮力等于液体密度、g 和排开体积的乘积。',
      '溢水体积就是 Vdisp，不是物体的全部体积，除非完全浸没。',
    ],
    [
      'Buoyant force equals liquid density times g times displaced volume.',
      'The overflow volume is Vdisp, not the whole object volume, unless the object is fully under.',
    ],
  ),

  atmosphere: lab(
    [
      '托里拆利管用水银，ρ_Hg = 13.6×10^3 kg/m^3，模型已固定。',
      '另有抽空半球，分离力按大气压作用在圆面上计算。',
      '这是课堂示意，不要把画面当成真实水银实验的操作说明。',
    ],
    [
      'The Torricelli column uses mercury with ρ_Hg fixed at 13.6×10^3 kg/m^3.',
      'A separate evacuated hemisphere gives the force to pull the halves apart.',
      'This is a classroom sketch, not a procedure for handling real mercury.',
    ],
    [
      '记下压强 P 和 g，读取水银柱高 h。',
      '对照托里拆利关系 h = P / (ρ_Hg g)。',
      '只增大 P，确认 h 同比增高。',
      '只增大 g，确认同一气压下 h 变矮。',
      '改变半球半径 r，读取分离力，对照 P·π r^2。半径加倍时力变为 4 倍。',
    ],
    [
      'Note pressure P and g, then read the mercury height h.',
      'Check Torricelli: h = P / (ρ_Hg g).',
      'Increase only P and confirm h rises in proportion.',
      'Increase only g and confirm h falls at the same pressure.',
      'Change the hemisphere radius r and read the separating force. Check P·π r^2. Doubling r multiplies the force by 4.',
    ],
    [
      '水银柱高由气压、水银密度和 g 决定。',
      '抽空半球的分离力是压强乘以圆面积，所以随 r 的平方变化。',
    ],
    [
      'Column height is set by pressure, mercury density, and g.',
      'The force on the evacuated hemisphere is pressure times the disk area, so it follows r squared.',
    ],
  ),

  'atom-levels': lab(
    [
      '氢原子能级示意：E_n = -13.6 eV / n^2。只讨论能级和光子能量。',
      '记下初态 n 和末态 n2。n 与 n2 都在 1 到 5。',
      '不要把本课延伸成光源或器件制作。',
    ],
    [
      'Classroom hydrogen levels: E_n = -13.6 eV / n^2. Stay with levels and photon energy.',
      'Note the starting level n and the other level n2. Both run from 1 to 5.',
      'Do not extend this lesson into building a light source or a device.',
    ],
    [
      '固定 n2 = 1，把 n 从 2 调到 5，读取各能级和光子能量 |E_n2 - E_n|。',
      '让 n2 高于 n，确认这是吸收；让 n2 低于 n，确认这是放出光子。',
      '比较 n = 1 与 n = 2 的能量间隔，再和更高能级的间隔比较，看间隔变密。',
      '把 n 与 n2 设成相同，确认光子能量为 0。',
      '用读数核对 E_n 与 1/n^2 成正比，负号表示束缚。',
    ],
    [
      'Hold n2 = 1 and step n from 2 to 5. Record each level and the photon energy |E_n2 - E_n|.',
      'Set n2 above n and treat that jump as absorption. Set n2 below n and treat it as emission.',
      'Compare the gap from n = 1 to n = 2 with gaps higher up, and see the gaps pack closer.',
      'Set n equal to n2 and confirm the photon energy is 0.',
      'Check that E_n scales as 1/n^2. The minus sign means the electron is bound.',
    ],
    [
      '能级差的绝对值就是吸收或放出的光子能量。',
      'n 越大，能级越靠近 0，相邻间隔越小。',
    ],
    [
      'The absolute level difference is the energy of the absorbed or emitted photon.',
      'Larger n sits closer to 0, and neighbouring gaps get smaller.',
    ],
  ),

  balance: lab(
    [
      '天平：左盘放物体，右盘放砝码，横梁上游码加在右侧质量上。',
      '先看游码零点，再读物体质量、砝码和游码。',
    ],
    [
      'A balance: the object is on the left pan, weights on the right, and the rider adds to the right-hand mass.',
      'Check the rider zero, then read object mass, weights, and rider.',
    ],
    [
      '拖动游码，观察横梁是否水平。',
      '调节砝码和游码，直到读数满足 m_object = m_weights + m_rider。',
      '只增加砝码，确认需要把游码往回移，或物体侧显得更轻。',
      '把游码移回零刻度，只靠砝码比较，记下差多少。',
      '改变物体质量后再配平一次，确认平衡条件仍是两侧质量相等。',
    ],
    [
      'Drag the rider and watch whether the beam is level.',
      'Adjust weights and rider until the readout meets m_object = m_weights + m_rider.',
      'Add weights only, and see that the rider must move back or the object side looks light.',
      'Return the rider to zero and compare with weights alone. Record the difference.',
      'Change the object mass and balance again. The condition is still equal mass on the two sides.',
    ],
    [
      '平衡时物体质量等于砝码加游码。',
      '游码是右盘质量的一部分，不是单独的第三套单位。',
    ],
    [
      'At balance the object mass equals weights plus rider.',
      'The rider is part of the right-hand mass, not a third kind of unit.',
    ],
  ),

  'bar-magnet': lab(
    [
      '条形磁铁外部的磁感线从 N 极出来，进入 S 极。',
      '强弱只改变画出的线条疏密，不改变这一走向。',
    ],
    [
      'Outside a bar magnet the field lines leave the north pole and enter the south pole.',
      'Strength only packs the drawn lines. It does not change that pattern.',
    ],
    [
      '看清线从哪一端离开、从哪一端进入，标出 N 和 S。',
      '增大强弱，数一数线条变密，走向仍是出 N 入 S。',
      '打开对调磁极，确认进出端互换，强弱读数可以不变。',
      '再把强弱调低，确认稀疏后的图仍是同一形状。',
      '不要把线条的多少读成一种新的磁极排列。',
    ],
    [
      'See which end the lines leave and which end they enter, and name N and S.',
      'Raise the strength and count a denser drawing. The sense is still out of N and into S.',
      'Swap the poles and confirm the ends exchange. Strength can stay the same.',
      'Lower the strength again and confirm the sparse drawing keeps the same shape.',
      'Do not read a denser drawing as a new arrangement of poles.',
    ],
    [
      '外部磁感线出 N 入 S。',
      '强弱只决定画得密不密。',
    ],
    [
      'Outside the magnet, lines leave north and enter south.',
      'Strength decides only how densely those lines are drawn.',
    ],
  ),

  'barrier-tunnel': lab(
    [
      '一维方势垒，能量 E、高度 V0、宽度 a 都在画面上，单位是焦耳和米。',
      'E < V0 时读透射系数 T；E > V0 时对照扫描峰和共振标记。',
      '只讨论这个教学公式，不讨论器件。',
    ],
    [
      'A rectangular barrier. Energy E, height V0, and width a are on the stage, in joules and metres.',
      'For E below V0 read the transmission T. Above V0 compare scanned peaks with the resonance marks.',
      'Stay with this teaching formula. Do not turn it into a device.',
    ],
    [
      '把 E 设到 V0 以下，读取 T 和情形（隧穿）。',
      '对照 E < V0 的公式 T = [1 + V0^2 sinh^2(κ a) / (4 E (V0 - E))]^(-1)。',
      '只加宽 a，确认同一 E 下 T 下降。',
      '把 E 调到 V0 以上，读取扫描峰数，并和 k2 a = n π 的共振标记比较。',
      '在峰附近微调 E，看 |E - En| 变小，T 靠近峰值。',
    ],
    [
      'Set E below V0 and record T and the tunnel regime.',
      'Check T = [1 + V0^2 sinh^2(κ a) / (4 E (V0 - E))]^(-1) for E < V0.',
      'Widen a only and confirm T falls at the same E.',
      'Set E above V0, record the scanned peak count, and compare with resonances where k2 a = n π.',
      'Nudge E near a peak and watch |E - En| shrink as T approaches the peak.',
    ],
    [
      '垒下透射随垒宽迅速变小，但不必为零。',
      '垒上的透射峰落在 k2 a = n π 附近。',
    ],
    [
      'Below the barrier, transmission falls quickly as the barrier widens, and it need not be zero.',
      'Above the barrier, transmission peaks sit near k2 a = n π.',
    ],
  ),

  beats: lab(
    [
      '两个同振幅的近频纯音，频率 f1 和 f2，振幅 A。',
      '用播放听或看包络，记下拍频。',
    ],
    [
      'Two pure tones of equal amplitude, frequencies f1 and f2, amplitude A.',
      'Use Play to watch the envelope and record the beat frequency.',
    ],
    [
      '让 |f1 - f2| 大约为 1 Hz，按下播放，看振幅一起一伏。',
      '读取拍频，对照 Δf = |f1 - f2|。',
      '把两频率再靠近，确认拍变慢，包络 2 A cos(π Δf t) 的周期变长。',
      '把两频率拉远，确认拍变快。',
      '只改变 A，确认拍频不变，包络的高度随 A 改变。',
    ],
    [
      'Set |f1 - f2| near 1 Hz, press Play, and watch the amplitude rise and fall.',
      'Read the beat frequency and check Δf = |f1 - f2|.',
      'Bring the frequencies closer and confirm the beats slow down. The envelope 2 A cos(π Δf t) has a longer period.',
      'Separate the frequencies and confirm the beats speed up.',
      'Change only A. The beat frequency stays put, and the envelope height follows A.',
    ],
    [
      '拍频是两频率之差的绝对值。',
      '振幅改变响度包络的高度，不改变拍有多快。',
    ],
    [
      'Beat frequency is the absolute difference of the two frequencies.',
      'Amplitude changes the height of the loudness envelope, not how fast the beats come.',
    ],
  ),

  'bell-singlet': lab(
    [
      '自旋单态的教学关联，两个测量角 α 和 β。',
      '读关联 ⟨σ_a · σ_b⟩ 以及同号、异号份额。',
      '这不是通信方案，不要把角度差当成可发送的信号。',
    ],
    [
      'A teaching correlation for a spin singlet, with measurement angles α and β.',
      'Read ⟨σ_a · σ_b⟩ and the shares of same-sign and opposite-sign outcomes.',
      'This is not a communication scheme. Do not treat the angle difference as a signal you can send.',
    ],
    [
      '令 α = β，读取关联，对照 -cos(0) = -1，异号份额应占满。',
      '令 |α - β| = 90°，确认关联为 0，同号与异号份额相等。',
      '令 |α - β| = 180°，确认 -cos(180°) = 1，同号份额占满。',
      '固定 α，只扫 β，看关联沿 -cos(α - β) 变化。',
      '记下同号概率和异号概率，确认它们随这个角度，而不是随某一个角单独变化。',
    ],
    [
      'Set α = β and read the correlation. Check -cos(0) = -1, so opposite outcomes take the whole share.',
      'Set |α - β| = 90° and confirm the correlation is 0, with equal same-sign and opposite-sign shares.',
      'Set |α - β| = 180° and confirm -cos(180°) = 1, so same-sign outcomes take the whole share.',
      'Hold α and sweep β. The correlation follows -cos(α - β).',
      'Record the same-sign and opposite-sign probabilities. They follow that angle difference, not one angle alone.',
    ],
    [
      '单态关联是 ⟨σ_a · σ_b⟩ = -cos(α - β)。',
      '结果份额由角度差决定。本课不提供一套通信步骤。',
    ],
    [
      'The singlet correlation is ⟨σ_a · σ_b⟩ = -cos(α - β).',
      'Outcome shares follow the angle difference. This lesson does not supply a communication procedure.',
    ],
  ),

  bernoulli: lab(
    [
      '先用管道情形：水平管，不可压缩，面积 A1、A2，入口速度 v1，密度 ρ，入口压强 P1。',
      '机翼情形只给定上下表面速度，不求解流场。',
      '若算出的 P2 小于 0，水平管假设已经不成立，读数仍会显示。',
    ],
    [
      'Start in the pipe case: a horizontal pipe, incompressible, areas A1 and A2, inlet speed v1, density ρ, inlet pressure P1.',
      'The wing case takes the two surface speeds as inputs. The flow field is not solved.',
      'If the reported P2 is negative, the horizontal-pipe assumptions have failed. The value is still shown.',
    ],
    [
      '在管道情形读取 v2 和 P2。对照连续性 A1 v1 = A2 v2。',
      '对照水平伯努利关系 P2 = P1 + ½ ρ (v1^2 - v2^2)。',
      '缩小 A2，确认 v2 增大、P2 下降。',
      '把 v1 加大到 P2 显示为负，记下这时公式的前提已经失败。',
      '改到机翼情形，改变上、下表面速度和面积，读取升力。它用的是同一个 ½ ρ Δ(v^2)，不是算出来的绕流。',
    ],
    [
      'In the pipe case read v2 and P2. Check continuity A1 v1 = A2 v2.',
      'Check horizontal Bernoulli: P2 = P1 + (1/2) ρ (v1^2 - v2^2).',
      'Shrink A2 and confirm v2 rises while P2 falls.',
      'Raise v1 until P2 is reported negative, and note that the assumptions have then failed.',
      'Switch to the wing case. Change the two speeds and the area and read the lift. It uses the same (1/2) ρ Δ(v^2). It is not a solved flow.',
    ],
    [
      '管道变窄则流速增大、压强减小，前提是水平、不可压缩且 P2 仍非负。',
      '机翼升力在本模型里直接来自给定的两侧速度差。',
    ],
    [
      'A narrower pipe means a higher speed and a lower pressure, while the flow stays horizontal, incompressible, and P2 stays non-negative.',
      'In this model wing lift comes directly from the two speeds you enter.',
    ],
  ),

  boiling: lab(
    [
      '恒定加热功率 P 的样品，质量 m，初温 T0，沸点 Tb。',
      '在 T–t 图上拖动时间，或用播放。',
      '平台段吸收的是汽化热，不是温度计失灵。',
    ],
    [
      'A sample heated at constant power P, with mass m, start temperature T0, and boiling point Tb.',
      'Drag time on the T–t graph, or use Play.',
      'The plateau is latent heat of vaporisation, not a stuck thermometer.',
    ],
    [
      '从 T0 播放到沸腾前，确认温度上升，热量 Q = P t。',
      '拖到平台上，读取温度，确认停在 Tb，同时 Q 仍在增加。',
      '对照平台上的热量 Q = m Lv。',
      '拖过平台，确认蒸汽温度再次上升。',
      '增大 m 或减小 P，确认到达沸点更晚、平台更长。',
    ],
    [
      'Play from T0 up to boiling and confirm the temperature rises while Q = P t.',
      'Drag onto the plateau, read the temperature, and confirm it stays at Tb while Q still increases.',
      'On the plateau check Q = m Lv.',
      'Drag past the plateau and confirm the vapour temperature climbs again.',
      'Increase m or lower P and confirm boiling starts later and the plateau lasts longer.',
    ],
    [
      '沸点之前升温，沸点上温度不变而继续吸热，之后蒸汽再升温。',
      '平台长短由 m Lv 和功率 P 决定。',
    ],
    [
      'Temperature rises before the boiling point, stays at Tb while heat is still absorbed, then the vapour warms again.',
      'How long the plateau lasts is set by m Lv and the power P.',
    ],
  ),

  'buoyancy-origin': lab(
    [
      '液体中的立方体，上表面深度可拖动。',
      '浮力来自上、下表面的压力差。两面都受的大气压已略去，因为它抵消。',
    ],
    [
      'A cube in liquid. Drag the depth of the top face.',
      'Buoyancy is the pressure difference between the bottom and top faces. Atmosphere on both faces is omitted because it cancels.',
    ],
    [
      '把立方体完全放进液面下，读取上下压力和 Fb。',
      '对照 Fb = Fup - Fdown = ρ g Vsub。',
      '只加深上表面，确认两侧压力都增大，压力差和 Fb 不变（仍全部浸没）。',
      '拖到部分露出，确认 Vsub 变小，Fb 变小。',
      '改变边长 a 或液体 ρ，确认完全浸没时 Fb 正比于体积和 ρ。',
    ],
    [
      'Place the cube fully under the surface and record the face forces and Fb.',
      'Check Fb = Fup - Fdown = ρ g Vsub.',
      'Lower the top face only, while the cube stays fully under. Both pressures rise, and the difference and Fb stay the same.',
      'Drag until part of the cube is out and confirm Vsub and Fb both fall.',
      'Change side a or liquid density ρ. Fully under, Fb is proportional to volume and to ρ.',
    ],
    [
      '浮力是下表面压力减去上表面压力，等于 ρ g 乘以排开体积。',
      '完全浸没后再下沉，浮力不再增大。',
    ],
    [
      'Buoyant force is the bottom force minus the top force, equal to ρ g times the submerged volume.',
      'Once the cube is fully under, sinking it further does not increase the buoyant force.',
    ],
  ),

  'buoyancy-weigh': lab(
    [
      '物体用细线吊着浸入液体。能完全吊住时，张力 T = G - Fb。',
      '若重力小于液体对全体积的浮力，细线松弛，物体不会被吊成完全浸没。',
    ],
    [
      'An object hangs from a string in liquid. When the string can hold it fully under, T = G - Fb.',
      'If the weight is less than the buoyant force on the whole volume, the string goes slack and the object is not held fully submerged.',
    ],
    [
      '先把物体密度设得明显高于液体，读取 G、Fb 和张力。',
      '对照 Fb = ρ_liquid g V，以及 T = G - Fb。',
      '只增大液体密度，确认 Fb 增大、张力减小。',
      '把物体密度降到液体以下，确认细线松弛，读数不再把物体当成完全浸没。',
      '再把 g 一起改变，确认 G 和 Fb 都含 g，张力差仍是 G - Fb（在吊得住的时候）。',
    ],
    [
      'Set the object density clearly above the liquid and record G, Fb, and tension.',
      'Check Fb = ρ_liquid g V and T = G - Fb.',
      'Increase only the liquid density and confirm Fb rises while tension falls.',
      'Drop the object density below the liquid and confirm the string goes slack. The object is no longer held fully under.',
      'Change g as well. Both G and Fb contain g, and the tension difference is still G - Fb when the string can hold the object.',
    ],
    [
      '吊得住时，弹簧或细线少称的那一部分就是浮力。',
      '物体比同体积液体轻时，这个完全浸没的称法不成立。',
    ],
    [
      'When the string holds, the missing part of the weight is the buoyant force.',
      'If the object is lighter than the same volume of liquid, this fully submerged weighing does not apply.',
    ],
  ),

  capacitance: lab(
    [
      '电容器的定义式 C = Q / U。电荷 Q 和电压 U 可调。',
      '本课只核对此定义，不讨论如何制作电容器。',
    ],
    [
      'The definition C = Q / U. Charge Q and voltage U are adjustable.',
      'This lesson checks that definition only. It does not describe how to build a capacitor.',
    ],
    [
      '记下 Q 和 U，读取 C，对照 C = Q / U。',
      '只把 Q 加倍，确认 C 加倍。',
      '只把 U 加倍，确认 C 减半。',
      '把 Q 和 U 按同一倍数改变，确认 C 不变。',
      '换一组较小的 Q 和 U，再算一次，确认比值稳定。',
    ],
    [
      'Note Q and U, read C, and check C = Q / U.',
      'Double only Q and confirm C doubles.',
      'Double only U and confirm C halves.',
      'Scale Q and U by the same factor and confirm C is unchanged.',
      'Pick a smaller pair and compute the ratio again. It stays the definition.',
    ],
    [
      '电容是电荷与电压的比值。',
      'Q 和 U 同比变化时，C 不变。',
    ],
    [
      'Capacitance is the ratio of charge to voltage.',
      'When Q and U scale together, C stays the same.',
    ],
  ),

  carnot: lab(
    [
      '高温热库 Th 和低温热库 Tc，温度用开尔文。',
      '画面给出卡诺效率 η = 1 - Tc/Th。保持 Tc < Th，否则这个热机方向不成立。',
    ],
    [
      'A hot reservoir Th and a cold reservoir Tc, both in kelvin.',
      'The stage reports Carnot efficiency η = 1 - Tc/Th. Keep Tc below Th, or this engine direction does not apply.',
    ],
    [
      '记下 Th 和 Tc，读取 η 和 Tc/Th。',
      '对照 η = 1 - Tc/Th。',
      '只提高 Tc，确认效率下降。',
      '只提高 Th，确认效率上升。',
      '把 Tc 调到接近 Th，确认 η 接近 0。不要改用摄氏温差代替这个比值。',
    ],
    [
      'Note Th and Tc and read η and Tc/Th.',
      'Check η = 1 - Tc/Th.',
      'Raise only Tc and confirm the efficiency falls.',
      'Raise only Th and confirm the efficiency rises.',
      'Bring Tc close to Th and confirm η approaches 0. Do not replace the ratio with a Celsius difference.',
    ],
    [
      '卡诺效率只由两个绝对温度的比值决定。',
      '冷热库温度越接近，效率越低。',
    ],
    [
      'Carnot efficiency depends only on the ratio of the two absolute temperatures.',
      'The closer the reservoirs are, the lower the efficiency.',
    ],
  ),

  'central-orbit': lab(
    [
      '从半径 r 处垂直于半径发射，速率 v。GM 是模型参数，不是某颗命名的行星。',
      '记下比能量和比角动量，再看轨道是哪种圆锥曲线。',
    ],
    [
      'Launch perpendicular to the radius from distance r at speed v. GM is the model parameter, not a named planet.',
      'Record specific energy and specific angular momentum, then see which conic the orbit is.',
    ],
    [
      '按下播放，读取轨道种类、偏心率 e、环绕速度和逃逸速度。',
      '把垂直速度调到环绕速度 √(GM/r)，确认轨道是圆，比能量为负。',
      '把速度放在环绕速度和逃逸速度之间，确认是椭圆。',
      '把速度调到逃逸速度，确认比能量约为 0，轨道是抛物线；再增大则 E > 0，成为双曲线。',
      '对照 E = 1/2 v^2 - GM/r 和 h = r v。速度接近 0 时轨道标成径向。',
    ],
    [
      'Press Play and read the orbit kind, eccentricity e, circular speed, and escape speed.',
      'Set the perpendicular speed to the circular speed √(GM/r) and confirm a circle, with negative specific energy.',
      'Place the speed between circular and escape and confirm an ellipse.',
      'Set the speed to escape and confirm specific energy near 0, a parabola. Raise it further and E > 0 becomes a hyperbola.',
      'Check E = (1/2) v^2 - GM/r and h = r v. Near v = 0 the orbit is labelled radial.',
    ],
    [
      '轨道种类由比能量的符号和偏心率决定，发射方向在本模型里垂直于半径。',
      'GM 只是参数。不要把画面读成某一颗真实行星的星历。',
    ],
    [
      'The kind of orbit follows the sign of the specific energy and the eccentricity. Launch in this model is perpendicular to the radius.',
      'GM is only a parameter. Do not read the drawing as the ephemeris of a named planet.',
    ],
  ),

  charges: lab(
    [
      '同一直线上的两个点电荷 q1、q2，间距 r 可拖动。',
      '库仑常量取 k = 9×10^9 N·m^2/C^2。同号相斥，异号相吸。',
    ],
    [
      'Two point charges q1 and q2 on a line. Drag the separation r.',
      'Coulomb constant k = 9×10^9 N·m^2/C^2. Like signs repel and unlike signs attract.',
    ],
    [
      '拖动间距，读取力 F。',
      '对照库仑定律 F = k |q1 q2| / r^2，并看箭头是斥还是吸。',
      '把 r 加倍，确认力变为约 1/4。',
      '只改变 q1 的符号，确认力反向，大小不变。',
      '两个电荷都改成同号，确认斥力；再改成异号，确认引力。',
    ],
    [
      'Drag the separation and read the force F.',
      'Check Coulomb’s law F = k |q1 q2| / r^2, and see whether the arrows repel or attract.',
      'Double r and confirm the force falls to about 1/4.',
      'Flip only the sign of q1. The force reverses and the magnitude stays the same.',
      'Set both charges the same sign and confirm repulsion, then opposite signs and confirm attraction.',
    ],
    [
      '力的大小与电量乘积成正比，与距离平方成反比。',
      '方向只由电荷是同号还是异号决定。',
    ],
    [
      'The force magnitude is proportional to the product of the charges and inversely proportional to distance squared.',
      'The sense is set only by whether the signs are the same or opposite.',
    ],
  ),

  circuit: lab(
    [
      '直流电路：电动势 E 与内阻 r 串联。理想导线电阻为零。',
      '初始接法可选串联、并联、变阻器或家庭电路。有的课会锁住接法，或禁止跳到家庭电路。',
      '负载上 W = U I t，P = U I，Q = I^2 R t。电阻服从欧姆定律，I–U 线是 U = I R。',
    ],
    [
      'Steady DC. The source is an emf E in series with internal resistance r. Ideal wires have no resistance.',
      'Starter wiring can be series, parallel, rheostat, or household. Some lessons lock the layout or block a jump to household.',
      'On a load, W = U I t, P = U I, and Q = I^2 R t. Resistors follow Ohm’s law. The I–U line is U = I R.',
    ],
    [
      '闭合开关，读取电流和端电压。断开开关，确认电流为 0。',
      '在串联里增大 R1 或 R2，确认电流下降。对照外电路欧姆定律。',
      '拖动变阻器滑片改变 Rs，确认电流和分压跟着变。',
      '把时间 t 从 0 增大，读取 W、P 和 Q，对照 W = U I t 与 Q = I^2 R t。',
      '若课允许，改成并联再比一次电流分配。短路端钮时电流为 I = E/r，不要在真实电池上做这件事。',
    ],
    [
      'Close the switch and read current and terminal voltage. Open it and confirm the current is 0.',
      'In series, raise R1 or R2 and confirm the current falls. Check Ohm’s law on the external circuit.',
      'Drag the rheostat slider to change Rs, and confirm current and the voltage split follow.',
      'Increase time t from 0 and read W, P, and Q. Check W = U I t and Q = I^2 R t.',
      'If the lesson allows it, switch to parallel and compare how current splits. A short across the terminals draws I = E/r. Do not do that to a real battery.',
    ],
    [
      '电流由电动势和总电阻决定，理想导线上没有额外压降。',
      '电能、电功率和热量分别对应 W = U I t、P = U I 和 Q = I^2 R t。',
    ],
    [
      'Current is set by the emf and the total resistance. Ideal wires add no extra drop.',
      'Electrical energy, power, and heat match W = U I t, P = U I, and Q = I^2 R t.',
    ],
  ),

  circular: lab(
    [
      '匀速圆周运动，质量 m、半径 r、角速度 ω。半径可在画面上拖动。',
      '向心力指向圆心。播放时看速度沿切线。',
    ],
    [
      'Uniform circular motion with mass m, radius r, and angular speed ω. Drag the radius on the stage.',
      'The centre-seeking force points inward. During Play the velocity stays tangent.',
    ],
    [
      '按下播放，确认速率不变、方向时刻改变。',
      '读取 v、a 和 F，对照 v = ω r，a = v^2 / r = ω^2 r，F = m a。',
      '拖大半径并保持 ω，确认 v 和 a 都增大。',
      '只增大 ω，确认 a 按 ω 的平方增大。',
      '只增大 m，确认 F 增大而 a 不变。',
    ],
    [
      'Press Play and confirm the speed is steady while the direction keeps changing.',
      'Read v, a, and F. Check v = ω r, a = v^2 / r = ω^2 r, and F = m a.',
      'Drag the radius up at the same ω and confirm both v and a increase.',
      'Increase only ω and confirm a grows with ω squared.',
      'Increase only m and confirm F grows while a stays the same.',
    ],
    [
      '向心力是 m v^2 / r，方向指向圆心。',
      '角速度不变时，半径越大，线速度和向心加速度越大。',
    ],
    [
      'The centre-seeking force is m v^2 / r, toward the centre.',
      'At fixed angular speed, a larger radius means a larger speed and a larger centripetal acceleration.',
    ],
  ),

  collide: lab(
    [
      '一维碰撞，无外力冲量时总动量守恒。',
      '弹性碰撞还保持动能；完全非弹性碰撞碰后共速。',
      '记下两物体质量 m1、m2 和碰前速度 u1、u2。',
    ],
    [
      'A one-dimensional collision. Total momentum is conserved when no external impulse acts.',
      'An elastic collision also keeps kinetic energy. A perfectly inelastic collision shares one final speed.',
      'Note masses m1 and m2 and the speeds u1 and u2 before impact.',
    ],
    [
      '先选弹性，读取碰前动量、碰后动量、v1、v2 和动能。',
      '确认碰前动量 m1 u1 + m2 u2 与碰后动量相等，动能也相等。',
      '改成完全非弹性，确认 v1 = v2，动量仍守恒，动能变小。',
      '令 u2 = 0 且 m1 = m2，在弹性下看速度交换。',
      '只增大 m2，比较两种碰撞里靶的末速度谁更大。',
    ],
    [
      'Choose elastic first and record momentum before and after, v1, v2, and kinetic energy.',
      'Confirm m1 u1 + m2 u2 matches the momentum after impact, and that kinetic energy matches too.',
      'Switch to perfectly inelastic. Confirm v1 = v2, momentum is still conserved, and kinetic energy drops.',
      'Set u2 = 0 and m1 = m2. In the elastic case watch the velocities exchange.',
      'Increase only m2 and compare the target’s final speed in the two kinds of collision.',
    ],
    [
      '没有外力冲量时，弹性与完全非弹性都守恒动量。',
      '只有弹性碰撞守恒动能；完全非弹性碰后只有一个共同速度。',
    ],
    [
      'With no external impulse, both the elastic and the perfectly inelastic cases conserve momentum.',
      'Only the elastic case keeps kinetic energy. The perfectly inelastic case ends at one shared speed.',
    ],
  ),

  'convex-lens': lab(
    [
      '光具座、凸透镜、光屏、蜡烛（或物屏）。',
      '记下透镜焦距 f，或先用平行光粗测 f。',
      '保证烛焰、透镜光心、光屏中心大致等高共轴。',
    ],
    [
      'Optical bench, converging lens, screen, and candle (or object).',
      'Note the focal length f, or estimate it with roughly parallel light.',
      'Keep the flame, lens centre, and screen centre roughly coaxial.',
    ],
    [
      '把蜡烛放在较远处，使物距 u > 2f；移动光屏直到出现清晰实像，记录 u、v 与像的倒正、大小。',
      '减小物距到 u = 2f，再次找清晰像并记录。',
      '取 f < u < 2f，重复找像与记录。',
      '把蜡烛移到焦点附近（u ≈ f）：光屏一侧找不到清晰实像。',
      '继续到 u < f：屏上无实像；透过透镜观察正立放大的虚像。',
      '用多组 u、v 对照薄透镜方程 1/u + 1/v = 1/f，归纳成像规律。在本课中拖动蜡烛与光屏完成上述步骤。',
    ],
    [
      'Place the candle so u > 2f; move the screen to a sharp real image; record u, v, and image character.',
      'Set u = 2f; find a sharp image and record again.',
      'Take f < u < 2f; repeat.',
      'Near the focus (u ≈ f): no sharp real image on the far screen.',
      'For u < f: no real image on the screen; looking through the lens shows an erect magnified virtual image.',
      'Check pairs with 1/u + 1/v = 1/f and summarise the imaging rules. Drag the candle and screen in this lesson to follow those steps.',
    ],
    [
      '物距变化时，像的倒正、大小、虚实随之改变，且满足 1/u + 1/v = 1/f。',
      'u > 2f 倒立缩小实像；u = 2f 倒立等大实像；f < u < 2f 倒立放大实像；u < f 正立放大虚像。',
    ],
    [
      'As u changes, image orientation, size, and real/virtual nature change, and pairs obey 1/u + 1/v = 1/f.',
      'u > 2f: inverted diminished real; u = 2f: inverted same-size real; f < u < 2f: inverted magnified real; u < f: erect magnified virtual.',
    ],
  ),

  'coupled-pendula': lab(
    [
      '两个等长单摆，用弱弹簧耦合。摆长 L、耦合 κ、两个初位移 θ1(0) 和 θ2(0)。',
      '能量按单位质量计，会在两摆之间来回。按下播放观察。',
    ],
    [
      'Two equal pendulums coupled by a weak spring. Length L, coupling κ, and initial angles θ1(0) and θ2(0).',
      'Energy is per unit mass and passes back and forth. Press Play to watch.',
    ],
    [
      '令 θ1(0) 不为 0、θ2(0) = 0，播放，看一个摆先动、另一个逐渐接上。',
      '对照方程 θ1′′ = -ω0^2 θ1 - κ (θ1 - θ2)，θ2′′ = -ω0^2 θ2 - κ (θ2 - θ1)。',
      '读取两摆能量，确认此消彼长，合计大致守住。',
      '令两摆初位移相同，确认它们一起摆，耦合项为零。',
      '增大 κ，确认能量交换变快；增大 L，确认摆动本身变慢。',
    ],
    [
      'Set θ1(0) away from 0 and θ2(0) = 0. Play, and watch one pendulum start while the other gradually joins.',
      'Check θ1′′ = -ω0^2 θ1 - κ (θ1 - θ2) and θ2′′ = -ω0^2 θ2 - κ (θ2 - θ1).',
      'Read the energy of each pendulum. One falls as the other rises, and the total stays about steady.',
      'Give both the same initial angle and confirm they swing together, so the coupling term is zero.',
      'Increase κ and confirm the energy swaps faster. Increase L and confirm the swing itself slows.',
    ],
    [
      '只有一个摆先被拉开时，弱耦合把能量周期性地送到另一个摆。',
      '对称初条件不激发能量交换。',
    ],
    [
      'When only one pendulum starts displaced, weak coupling hands energy to the other periodically.',
      'A symmetric start does not excite that exchange.',
    ],
  ),

  current: lab(
    [
      '稳定电流：电荷 Q 在时间 t 内通过某一横截面。',
      '定义 I = Q / t。先选定 Q 和 t 再读电流。',
    ],
    [
      'Steady current: charge Q passes a cross-section in time t.',
      'The definition is I = Q / t. Choose Q and t, then read the current.',
    ],
    [
      '记下 Q 和 t，读取 I，对照 I = Q / t。',
      '只把 t 加倍，确认电流减半。',
      '只把 Q 加倍，确认电流加倍。',
      '把 Q 和 t 按同一倍数放大，确认 I 不变。',
      '再取一段很短的 t，确认比值仍然是同一电流，只要 Q 同比变小。',
    ],
    [
      'Note Q and t, read I, and check I = Q / t.',
      'Double only t and confirm the current halves.',
      'Double only Q and confirm the current doubles.',
      'Scale Q and t by the same factor and confirm I is unchanged.',
      'Take a much shorter t and confirm the ratio is the same current when Q scales down with it.',
    ],
    [
      '电流是单位时间通过截面的电荷量。',
      'Q 与 t 同比变化时，I 不变。',
    ],
    [
      'Current is the charge passing a cross-section per unit time.',
      'When Q and t scale together, I stays the same.',
    ],
  ),

  cyclotron: lab(
    [
      '匀强磁场中，速度垂直于 B 的带电粒子。质量 m、电荷 q、速率 v、磁场 B。',
      '本课只核轨道半径和角速度。不要把它写成加速器的建造或调试步骤。',
    ],
    [
      'A charged particle in a uniform field, with velocity perpendicular to B. Mass m, charge q, speed v, and field B.',
      'This lesson checks orbit radius and angular speed only. Do not turn it into steps for building or tuning an accelerator.',
    ],
    [
      '按下播放，看粒子走圆，读取半径 r 和角速度 ω。',
      '对照 r = m v / (|q| B)，ω = |q| B / m。',
      '只增大 v，确认半径增大，ω 不变。',
      '只增大 B，确认半径变小、ω 变大。',
      '只增大 m，确认半径变大、ω 变小。电荷取相反符号时，转向相反，r 和 ω 的大小不变。',
    ],
    [
      'Press Play, watch the circle, and record radius r and angular speed ω.',
      'Check r = m v / (|q| B) and ω = |q| B / m.',
      'Increase only v and confirm the radius grows while ω stays the same.',
      'Increase only B and confirm the radius shrinks while ω rises.',
      'Increase only m and confirm the radius grows while ω falls. Flipping the sign of q reverses the sense. The magnitudes of r and ω stay the same.',
    ],
    [
      '回旋频率 ω = |q| B / m 与速率无关。',
      '半径正比于动量，反比于 |q| B。',
    ],
    [
      'The cyclotron frequency ω = |q| B / m does not depend on speed.',
      'The radius is proportional to momentum and inversely proportional to |q| B.',
    ],
  ),

  density: lab(
    [
      '同体积的不同物质。密度表是初中常用的约整数：水 1000、酒精 800、冰 900、铝 2700、铁 7900、铜 8900，单位 kg/m^3。',
      '关系是 ρ = m / V。也可以直接改 ρ。',
    ],
    [
      'Different materials at the same volume. The table uses the rounded junior values: water 1000, alcohol 800, ice 900, aluminium 2700, iron 7900, copper 8900, in kg/m^3.',
      'The relation is ρ = m / V. You can also type ρ directly.',
    ],
    [
      '选定一种物质，记下 V 和 ρ，读取质量 m。',
      '对照 m = ρ V。',
      '保持 V 不变，从酒精换到铁，确认质量按密度比增大。',
      '只把体积加倍，确认质量加倍、密度不变。',
      '用手改 ρ，脱离表中的约整数，确认公式仍是 ρ = m / V。',
    ],
    [
      'Choose a material, note V and ρ, and read the mass m.',
      'Check m = ρ V.',
      'Keep V fixed and switch from alcohol to iron. The mass rises in proportion to density.',
      'Double only the volume and confirm the mass doubles while the density stays put.',
      'Type a ρ that is not one of the rounded table values and confirm the relation is still ρ = m / V.',
    ],
    [
      '同体积时，质量与密度成正比。',
      '密度是质量与体积的比，换体积不改变物质的 ρ。',
    ],
    [
      'At the same volume, mass is proportional to density.',
      'Density is mass per volume. Changing the volume does not change the material’s ρ.',
    ],
  ),

  'density-lab': lab(
    [
      '量筒里先有水，体积读数 V1，放入样品后水面为 V2。',
      '样品体积 V = V2 - V1。天平质量 m = ρ V，并可在 kg/m^3 与 g/cm^3 之间对照。',
      '只用 V2 去除质量，是这个实验里要避开的错误。',
    ],
    [
      'A cylinder already holds water at reading V1. After the specimen is added the level is V2.',
      'Specimen volume is V = V2 - V1. The balance mass is m = ρ V, shown so kg/m^3 and g/cm^3 can be compared.',
      'Dividing the mass by V2 alone is the error this lab is meant to catch.',
    ],
    [
      '选定样品，记下 ρ、V 和放入前的 V1。',
      '读取 V2 = V1 + V 和质量 m。',
      '用 ρ = m / (V2 - V1) 算密度，并和给定 ρ 比较。',
      '故意用 m / V2 再算一次，看它比真实密度偏小。',
      '换一种样品或改变 V1，重复差值法，确认单位换算不改变 ρ 本身。',
    ],
    [
      'Choose a specimen and note ρ, V, and the water reading V1 before it goes in.',
      'Read V2 = V1 + V and the mass m.',
      'Compute ρ = m / (V2 - V1) and compare it with the given density.',
      'On purpose compute m / V2 once, and see that it comes out below the true density.',
      'Change the specimen or V1 and repeat the difference method. Unit conversion does not change ρ itself.',
    ],
    [
      '样品体积是水面上升量 V2 - V1，不是后来的总读数。',
      '用 V2 做分母会把密度算小。',
    ],
    [
      'The specimen volume is the rise V2 - V1, not the later total reading.',
      'Using V2 as the denominator underestimates the density.',
    ],
  ),

  'dipole-radiation': lab(
    [
      '电偶极子远场只看相对偶极轴的角分布。',
      '强度因子是 sin^2 θ。θ = 0 沿轴。本课不讨论如何驱动天线。',
    ],
    [
      'The far field of an electric dipole is only the angular factor relative to the dipole axis.',
      'The intensity factor is sin^2 θ. θ = 0 is along the axis. This lesson does not describe how to drive an antenna.',
    ],
    [
      '把 θ 设为 0，读取角因子，确认它是 0。',
      '把 θ 设为 90°，确认因子为 1，这是最大方向。',
      '取 30° 和 60°，对照 sin^2 θ，60° 应明显更大。',
      '取 180°，确认又回到轴上，因子再次为 0。',
      '不要把这个因子读成功率、距离或馈电方法。',
    ],
    [
      'Set θ to 0 and read the angular factor. It is 0.',
      'Set θ to 90° and confirm the factor is 1, the maximum.',
      'Try 30° and 60° against sin^2 θ. The 60° value is clearly larger.',
      'Set 180° and confirm you are back on the axis, so the factor is 0 again.',
      'Do not read this factor as a power, a range, or a feed method.',
    ],
    [
      '远场强度沿偶极轴为 0，在赤道方向最大，按 sin^2 θ。',
      '本模型只给出这个角因子。',
    ],
    [
      'Far-field intensity is zero on the dipole axis and largest in the equatorial direction, following sin^2 θ.',
      'This model supplies only that angular factor.',
    ],
  ),

  dispersion: lab(
    [
      '色散关系 ω^2 = ω0^2 + c^2 k^2。可调 ω0、c 和波数 k。',
      '分别读相速度 vp = ω / k 和群速度 vg = c^2 k / ω。',
    ],
    [
      'Dispersion relation ω^2 = ω0^2 + c^2 k^2. Adjust ω0, c, and wave number k.',
      'Read phase velocity vp = ω / k and group velocity vg = c^2 k / ω separately.',
    ],
    [
      '记下 k，读取 ω、vp 和 vg。',
      '对照 vp = ω / k 与 vg = c^2 k / ω，并看 vp vg 是否等于 c^2。',
      '增大 k，确认 ω 升高，vp 与 vg 逐渐靠近。',
      '增大 ω0，确认同一 k 下 ω 和 vp 变大，vg 变小。',
      '令 ω0 接近 0，确认 vp 和 vg 都靠近 c。',
    ],
    [
      'Note k and read ω, vp, and vg.',
      'Check vp = ω / k and vg = c^2 k / ω, and see whether vp vg equals c^2.',
      'Increase k and confirm ω rises while vp and vg move toward each other.',
      'Increase ω0 and confirm, at the same k, that ω and vp rise while vg falls.',
      'Bring ω0 near 0 and confirm both vp and vg approach c.',
    ],
    [
      '相速度是 ω/k，群速度是 c^2 k / ω，两者乘积为 c^2。',
      '有截止 ω0 时，相速度大于群速度。',
    ],
    [
      'Phase velocity is ω/k and group velocity is c^2 k / ω. Their product is c^2.',
      'With a cutoff ω0, phase velocity is greater than group velocity.',
    ],
  ),

  doppler: lab(
    [
      '声源频率 f，声速 v，观察者速率 vo，声源速率 vs。',
      '两个开关表示观察者是否靠近声源、声源是否靠近观察者。课堂符号就加在这两个开关上。',
      '公式 f′ = f (v ± vo) / (v ± vs)。速率不要超过声速，否则这个式子的前提不成立。',
    ],
    [
      'Source frequency f, sound speed v, observer speed vo, and source speed vs.',
      'Two switches say whether the observer moves toward the source and whether the source moves toward the observer. The classroom plus and minus signs sit on those switches.',
      'The formula is f′ = f (v ± vo) / (v ± vs). Keep speeds below the sound speed, or the assumptions fail.',
    ],
    [
      '两者都静止，确认 f′ = f。',
      '只打开观察者靠近声源，确认分子用 v + vo，f′ 升高。',
      '只打开声源靠近观察者，确认分母用 v - vs，f′ 也升高，而且通常升得更多。',
      '改成互相远离，确认频率下降。',
      '只改变 f，确认 f′ 与 f 成正比，符号规则不变。',
    ],
    [
      'With both at rest, confirm f′ = f.',
      'Turn on only “observer toward source” and confirm the numerator uses v + vo, so f′ rises.',
      'Turn on only “source toward observer” and confirm the denominator uses v - vs. f′ rises, usually by more.',
      'Set them moving apart and confirm the frequency falls.',
      'Change only f and confirm f′ scales with f. The sign rule stays the same.',
    ],
    [
      '多普勒公式 f′ = f (v ± vo) / (v ± vs)，靠近用使频率升高的符号。',
      '声源运动改的是分母，观察者运动改的是分子。',
    ],
    [
      'The Doppler formula is f′ = f (v ± vo) / (v ± vs). Toward the other body uses the sign that raises the frequency.',
      'Source motion changes the denominator. Observer motion changes the numerator.',
    ],
  ),

  'double-slit': lab(
    [
      '杨氏双缝：波长 λ、屏距 D、缝距 d。缝宽 a 用于可选的单缝包络。',
      '屏上位置 y 可调。中央亮纹宽度条可以拖动，读的是 2 λ D / a。',
    ],
    [
      'Young double-slit: wavelength λ, screen distance D, and slit spacing d. Slit width a is for the optional single-slit envelope.',
      'Screen position y is adjustable. Drag the central-maximum bar to read 2 λ D / a.',
    ],
    [
      '先关掉 sinc^2 包络，在 y = 0 读取光强，这是中央最亮处。',
      '改变 y，找到相邻亮纹，读取间距，对照 Δy = λ D / d。',
      '只减小 d，确认条纹变疏。只增大 D 或 λ，确认条纹也变疏。',
      '光强形状对照 I 正比于 cos^2(π d y / (λ D))。',
      '打开包络，拖动宽度条，确认单缝因子 sinc^2(π a y / (λ D)) 乘在双缝图样上，a 越小包络越宽。',
    ],
    [
      'Leave the sinc^2 envelope off. At y = 0 read the intensity. That is the brightest centre.',
      'Change y, find the next bright fringe, and record the spacing. Check Δy = λ D / d.',
      'Decrease only d and confirm the fringes spread out. Increase only D or λ and confirm they spread out too.',
      'Check that I is proportional to cos^2(π d y / (λ D)).',
      'Turn the envelope on and drag the width bar. The single-slit factor sinc^2(π a y / (λ D)) multiplies the double-slit pattern. A smaller a makes a wider envelope.',
    ],
    [
      '双缝条纹间距是 λ D / d。',
      '打开包络后，整体还乘上缝宽决定的 sinc^2。',
    ],
    [
      'Double-slit fringe spacing is λ D / d.',
      'With the envelope on, the pattern is also multiplied by the sinc^2 set by the slit width.',
    ],
  ),

  'echo-range': lab(
    [
      '空气中超声测距，默认声速 v = 340 m/s，可以改。',
      't 是往返时间。距离 s = v t / 2，不要忘了除以 2。',
    ],
    [
      'Ultrasound ranging in air. The public speed starts at v = 340 m/s and can be changed.',
      't is the round-trip time. Distance is s = v t / 2. Do not forget the factor 1/2.',
    ],
    [
      '记下 t 和 v，读取距离 s。',
      '对照 s = v t / 2。',
      '只把 t 加倍，确认距离加倍。',
      '只把 v 改成另一个声速，确认同一回波时间对应的距离正比于 v。',
      '用 v t 不加除 2 心算一次，看它恰好是读数的两倍，这是往返造成的。',
    ],
    [
      'Note t and v and read the distance s.',
      'Check s = v t / 2.',
      'Double only t and confirm the distance doubles.',
      'Change v to another sound speed and confirm distance at the same echo time is proportional to v.',
      'Compute v t without the 1/2 once. It is exactly twice the readout, because the sound travels out and back.',
    ],
    [
      '回波时间包含去和回，所以距离是 v t / 2。',
      '声速改变时，同样的 t 代表不同的距离。',
    ],
    [
      'Echo time includes the trip out and the trip back, so the distance is v t / 2.',
      'A different sound speed makes the same t mean a different distance.',
    ],
  ),

  efficiency: lab(
    [
      '只使用公开的效率比 η = E_useful / E_in。输入能量和有用能量都用焦耳。',
      '浪费是 E_in - E_useful。不要把本课写成某种机器的制作步骤。',
    ],
    [
      'Use only the public ratio η = E_useful / E_in. Both energies are in joules.',
      'Waste is E_in - E_useful. Do not turn this lesson into steps for building a machine.',
    ],
    [
      '记下 Ein 和有用能量 Eu，读取 η。',
      '对照 η = Eu / Ein，并读取浪费 Ein - Eu。',
      '只增大 Eu，确认效率升高，直到 Eu 接近 Ein。',
      '只增大 Ein 而 Eu 不变，确认效率下降、浪费增大。',
      '把 Eu 设为 0，确认效率为 0，输入全部成为浪费。',
    ],
    [
      'Note Ein and useful energy Eu and read η.',
      'Check η = Eu / Ein and read the waste Ein - Eu.',
      'Increase only Eu and confirm the efficiency rises until Eu approaches Ein.',
      'Increase only Ein with Eu fixed and confirm the efficiency falls while waste grows.',
      'Set Eu to 0 and confirm the efficiency is 0. The whole input is waste.',
    ],
    [
      '效率是有用能量与输入能量之比。',
      '浪费是两者之差，不是另一个独立的输入。',
    ],
    [
      'Efficiency is useful energy divided by energy in.',
      'Waste is the difference of those two, not a separate input.',
    ],
  ),

  'em-wave': lab(
    [
      '真空中电磁波，c = f λ。E 和 B 同相，彼此垂直，并都垂直于传播方向。',
      '画出的振幅共用这一个相位。频率 f 和 E 的振幅可调。按下播放。',
    ],
    [
      'An electromagnetic wave in vacuum, c = f λ. E and B stay in phase, perpendicular to each other and to the direction of travel.',
      'The drawn amplitudes share that one phase. Frequency f and the E amplitude are adjustable. Press Play.',
    ],
    [
      '按下播放，看 E 和 B 一起变号，没有相位差。',
      '读取波长，对照 c = f λ。',
      '只增大 f，确认波长变短，E 与 B 仍同相且互相垂直。',
      '只增大 E 的振幅，确认 B 的振幅按 |B| = |E| / c 一起变，相位不变。',
      '暂停在波峰，核对传播方向与两个场都垂直。',
    ],
    [
      'Press Play and watch E and B change sign together, with no phase lag.',
      'Read the wavelength and check c = f λ.',
      'Increase only f and confirm the wavelength shortens. E and B stay in phase and perpendicular.',
      'Increase only the E amplitude and confirm the B amplitude follows |B| = |E| / c. The phase does not change.',
      'Pause on a crest and check that the travel direction is perpendicular to both fields.',
    ],
    [
      '真空中 f 与 λ 的乘积是光速。',
      'E 和 B 同相，且 |B| = |E| / c。',
    ],
    [
      'In vacuum the product f λ is the speed of light.',
      'E and B are in phase, and |B| = |E| / c.',
    ],
  ),

  energy: lab(
    [
      '物体从斜面顶端由静止释放，斜面倾角 α，然后滑到水平地面。',
      '沿斜面 a = g sin α - μ g cos α。机械能是 m g h + ½ m v^2。',
      'μ = 0 时机械能保持为 m g H。按下播放。',
    ],
    [
      'The object is released from rest at the top of an incline of angle α, then runs onto a horizontal floor.',
      'Along the slope a = g sin α - μ g cos α. Mechanical energy is m g h + (1/2) m v^2.',
      'When μ = 0 the mechanical energy stays at m g H. Press Play.',
    ],
    [
      '令 μ = 0，播放全程，读取高度、速度和机械能，确认总能量保持 m g H。',
      '在斜面上暂停，对照 a = g sin α，以及动能增加等于势能减少。',
      '加上摩擦 μ，再播放，确认机械能下降，水平段最终停下。',
      '只增大 α，确认下滑更快；若 μ 较大，注意 a 可能变小甚至反向。',
      '只增大质量，确认 μ = 0 时加速度不变，能量按质量同比增大。',
    ],
    [
      'Set μ = 0, play the whole run, and record height, speed, and mechanical energy. The total stays at m g H.',
      'Pause on the slope and check a = g sin α, with the gain in kinetic energy matching the loss in potential energy.',
      'Turn friction on and play again. Mechanical energy falls, and the object eventually stops on the flat.',
      'Increase only α and confirm a quicker slide. If μ is large, a can shrink or reverse.',
      'Increase only the mass. With μ = 0 the acceleration is unchanged and the energy scales with mass.',
    ],
    [
      '没有摩擦时机械能守恒，等于释放处的 m g H。',
      '有摩擦时沿斜面加速度是 g sin α - μ g cos α，机械能减少。',
    ],
    [
      'With no friction, mechanical energy is conserved and equals m g H at release.',
      'With friction, the acceleration along the slope is g sin α - μ g cos α, and mechanical energy decreases.',
    ],
  ),

  'energy-share': lab(
    [
      '一份能量 E0 分成两个库。份额 f 进入库 2，库 1 留下其余部分。',
      '守恒写法是 E1 + E2 = E0。f 是份额，不是频率。',
    ],
    [
      'One store of energy E0 splits into two. Share f goes into store 2, and store 1 keeps the rest.',
      'Conservation is E1 + E2 = E0. Here f is a share, not a frequency.',
    ],
    [
      '记下 E0 和 f，读取 E1、E2 和合计。',
      '对照 E2 = f E0，E1 = (1 - f) E0，合计等于 E0。',
      '把 f 从 0 调到 1，确认能量从库 1 全部转到库 2，合计不变。',
      '只增大 E0，确认两库同比增大，f 不变。',
      '在 f = 0.5 处核对两库相等。',
    ],
    [
      'Note E0 and f and read E1, E2, and the total.',
      'Check E2 = f E0, E1 = (1 - f) E0, and a total equal to E0.',
      'Move f from 0 to 1 and confirm the energy moves entirely from store 1 to store 2 while the total stays fixed.',
      'Increase only E0 and confirm both stores scale up. f is unchanged.',
      'At f = 0.5 check that the two stores are equal.',
    ],
    [
      '转化只改变两库的分配，不改变 E1 + E2。',
      'f 是进入库 2 的份额。',
    ],
    [
      'Conversion changes how the energy is split. It does not change E1 + E2.',
      'f is the share that goes into store 2.',
    ],
  ),

  'field-potential': lab(
    [
      '匀强电场中两板间距 d，电势差 U = E d。',
      '电荷 q 沿电场移动时，电场力做功 W = q U。',
    ],
    [
      'Parallel plates a distance d apart in a uniform field, with potential difference U = E d.',
      'The work on a charge q moved along the field is W = q U.',
    ],
    [
      '记下 E 和 d，读取 U，对照 U = E d。',
      '放入电荷 q，读取功 W，对照 W = q U。',
      '只增大 d，确认 U 和 |W| 都增大。',
      '把 q 改为负，确认功的符号反过来。',
      '只把 E 加倍，确认 U 和 W 都加倍。',
    ],
    [
      'Note E and d, read U, and check U = E d.',
      'Set the charge q, read the work W, and check W = q U.',
      'Increase only d and confirm both U and |W| increase.',
      'Make q negative and confirm the sign of the work reverses.',
      'Double only E and confirm both U and W double.',
    ],
    [
      '匀强电场里电势差是场强乘间距。',
      '沿电场移动电荷时，功是电荷乘电势差。',
    ],
    [
      'In a uniform field the potential difference is field strength times separation.',
      'Work on a charge moved along the field is charge times that potential difference.',
    ],
  ),

  'finite-well': lab(
    [
      '有限深方势阱，宽度 L，深度 V0。束缚能级由偶宇称和奇宇称匹配得到。',
      '探针能量 E 用同一高度和宽度的方势垒透射 T(E)，用来和无限深阱的 E_n 对照。',
      '能量在画面上用焦耳。只讨论能级和透射，不讨论器件。',
    ],
    [
      'A finite square well of width L and depth V0. Bound levels come from even and odd matching.',
      'Probe energy E uses rectangular-barrier transmission T(E) of the same height and width, set beside the infinite-well E_n.',
      'Energies on the stage are in joules. Stay with levels and transmission. Do not turn this into a device.',
    ],
    [
      '读取束缚态个数、基态 E1 finite、宇称，以及同宽无限深阱的 E1 infinite。',
      '确认 E1 finite 低于 E1 infinite，因为波函数会渗出阱外。',
      '改变 L，看束缚态数目和能级位置一起变。',
      '改变 V0，确认阱变浅时束缚态变少，基态更靠近阱口。',
      '移动探针 E，读取 T(E)。E 低于阱深时透射小，高于阱深时透射明显变大。',
    ],
    [
      'Read the number of bound states, the ground energy E1 finite, its parity, and E1 infinite for the infinite well of the same width.',
      'Confirm E1 finite lies below E1 infinite, because the wave function leaks outside the well.',
      'Change L and watch both the number of bound states and their positions move.',
      'Change V0. A shallower well holds fewer bound states, and the ground state sits closer to the top.',
      'Move the probe E and read T(E). Transmission is small below the well depth and clearly larger above it.',
    ],
    [
      '有限阱基态低于同宽无限深阱，差在波函数渗出。',
      '连续区的 T(E) 用的是同样高、同样宽的方势垒。',
    ],
    [
      'The finite-well ground state lies below the infinite well of the same width because the wave function leaks.',
      'Continuum T(E) uses a rectangular barrier of the same height and width.',
    ],
  ),

  'float-sink': lab(
    [
      '比较重力与阿基米德浮力。实心物体用密度，轮船和潜艇用总质量除以船体容积。',
      '漂浮：Vdisp / V = ρ_avg / ρ_liquid，且 Fb = G。悬浮：ρ_avg = ρ_liquid。沉底：Fb = ρ_liquid g V < G，底部支持力 N = G - Fb。',
    ],
    [
      'Compare weight with the Archimedes force. A solid uses density. A ship or submarine uses total mass over hull volume.',
      'Floating: Vdisp / V = ρ_avg / ρ_liquid and Fb = G. Suspended: ρ_avg = ρ_liquid. Sunk: Fb = ρ_liquid g V < G, and the bottom normal force is N = G - Fb.',
    ],
    [
      '选实心物体，令 ρ 小于液体，读取状态、Vdisp/V 和 Fb，确认 Fb = G。',
      '把实心密度调到等于液体，确认悬浮，排开体积等于全体积。',
      '把实心密度调到大于液体，确认沉底，并读取 N = G - Fb。',
      '改成轮船，改变船体质量，看平均密度越过液体密度时由漂浮变为下沉。',
      '改成潜艇，增加压载水，确认平均密度升高，状态从漂浮走向悬浮或沉底。',
    ],
    [
      'Choose a solid with density below the liquid. Record the state, Vdisp/V, and Fb, and confirm Fb = G.',
      'Set the solid density equal to the liquid and confirm it is suspended, with displaced volume equal to the whole volume.',
      'Set the solid density above the liquid and confirm it sinks. Read N = G - Fb.',
      'Switch to the ship and change hull mass. When average density crosses the liquid density, floating gives way to sinking.',
      'Switch to the submarine and add ballast water. Average density rises, and the state moves from floating toward suspended or sunk.',
    ],
    [
      '漂浮和悬浮时浮力等于重力。沉底时底部还要提供 N = G - Fb。',
      '船和潜艇看的是总质量与船体容积之比，不是壳材料本身的密度。',
    ],
    [
      'While floating or suspended, buoyant force equals weight. On the bottom, the normal force is N = G - Fb.',
      'A ship or submarine is judged by total mass over hull volume, not by the density of the hull material alone.',
    ],
  ),

  'force-compose': lab(
    [
      '同一直线上的两个力。向右为正，向左为负。',
      '合力是带符号的和 Fnet = F1 + F2，不是两个绝对值相加。',
    ],
    [
      'Two forces on one line. Right is positive and left is negative.',
      'The resultant is the signed sum Fnet = F1 + F2, not the sum of the absolute values.',
    ],
    [
      '令 F1 和 F2 都为正，读取合力，确认等于两者之和。',
      '把 F2 改为负，且 |F2| < F1，确认合力变小且仍向右。',
      '令 F2 = -F1，确认合力为 0。',
      '令 |F2| > F1 且 F2 为负，确认合力向左，符号为负。',
      '不要用 |F1| + |F2| 当作读数。方向相反时那样会把合力算大。',
    ],
    [
      'Set both F1 and F2 positive and read the resultant. It equals their sum.',
      'Make F2 negative with |F2| < F1 and confirm the resultant shrinks and still points right.',
      'Set F2 = -F1 and confirm the resultant is 0.',
      'Make |F2| > F1 with F2 negative and confirm the resultant points left, with a negative sign.',
      'Do not treat |F1| + |F2| as the readout. When the forces oppose, that sum is too large.',
    ],
    [
      '共线合力是 F1 + F2，右为正。',
      '反向时要相减，不是把两个大小加起来。',
    ],
    [
      'The collinear resultant is F1 + F2, with right positive.',
      'Opposite forces subtract. They are not added as two sizes.',
    ],
  ),

  'force-elements': lab(
    [
      '力作用在杆上。大小 F、相对杆的方向 θ、作用点 s 都可调。',
      '拖动力的箭尾改作用点，拖箭头改方向。力矩绕杆中心。',
    ],
    [
      'A force on a bar. Magnitude F, direction θ from the bar, and point of application s are adjustable.',
      'Drag the tail to move the point of application and the tip to change direction. The moment is about the bar centre.',
    ],
    [
      '读取力矩 τ，对照 τ = s F sin θ，也就是 τ = r × F 的大小。',
      '只增大 F，确认 τ 同比增大。',
      '把 θ 调到 0 或 180°，确认 sin θ = 0，力矩为 0。',
      '把 θ 调到 90°，确认 |τ| 最大。',
      '保持 F 和 θ 不变，只拖动作用点 s，确认力矩改变。同一大小和方向，作用点不同，力矩不同。',
    ],
    [
      'Read the moment τ and check τ = s F sin θ, the magnitude from τ = r × F.',
      'Increase only F and confirm τ scales with it.',
      'Set θ to 0 or 180° and confirm sin θ = 0, so the moment is 0.',
      'Set θ to 90° and confirm |τ| is largest.',
      'Keep F and θ fixed and drag only the point s. The moment changes. Same magnitude and direction with a different point gives a different moment.',
    ],
    [
      '力矩是力臂意义下的 s F sin θ。',
      '力的作用点沿杆移动会改变力矩，即使箭头的长短和方向不变。',
    ],
    [
      'The moment is s F sin θ.',
      'Moving the point of application along the bar changes the moment even when the arrow length and direction stay fixed.',
    ],
  ),

  'fourier-square': lab(
    [
      '方波的傅里叶部分和，只加奇次谐波。项数 N、基频 f0、振幅 A。',
      '按下播放，看部分和怎样逼近方波。',
    ],
    [
      'A Fourier partial sum of a square wave, odd harmonics only. Term count N, fundamental f0, and amplitude A.',
      'Press Play and watch the partial sum approach the square wave.',
    ],
    [
      '令 N = 1，播放，确认只有基频正弦。',
      '把 N 增到 5、再增到更大，看平台变平、边沿变陡，并出现吉布斯起伏。',
      '对照部分和 (4A/π) Σ_{k odd} sin(k ω t) / k。',
      '只改变 A，确认波形高度同比变化，形状不变。',
      '只改变 f0，确认波变密或变疏，谐波仍是 1、3、5 倍基频。',
    ],
    [
      'Set N = 1, press Play, and confirm there is only the fundamental sine.',
      'Raise N to 5 and then higher. The top flattens, the edges steepen, and Gibbs ripples remain.',
      'Check the partial sum (4A/π) times the sum over odd k of sin(k ω t) / k.',
      'Change only A and confirm the height scales while the shape stays.',
      'Change only f0 and confirm the wave packs tighter or looser. Harmonics stay at 1, 3, 5 times the fundamental.',
    ],
    [
      '方波的部分和只用奇次谐波，每一项再除以它的次数。',
      '项数越多越接近方波，但有限项在跳变处仍有起伏。',
    ],
    [
      'The square-wave partial sum uses odd harmonics only, each divided by its order.',
      'More terms sit closer to the square wave, but a finite sum still ripples at the jumps.',
    ],
  ),

  frames: lab(
    [
      '速度都存在地面参照里。换参照物时，每个速度减去该参照物的地面速度，位置从该物体量起。',
      '可调参照、小车速度和人的速度。按下播放。',
    ],
    [
      'Velocities are stored in the ground frame. In another frame every velocity has that frame ground-velocity subtracted, and positions are measured from that object.',
      'Choose the reference, the cart speed, and the person speed. Press Play.',
    ],
    [
      '先选地面，播放，记下小车和人的速度，这就是存储值。',
      '改选小车为参照，确认人的速度变成 vPerson - vCart，小车自己的速度为 0。',
      '改选人为参照，确认小车速度变成 vCart - vPerson。',
      '把两人速度设成相等，确认他们互相看着是静止的。',
      '只改变小车的地面速度，再回到小车参照，确认其余物体的相对速度一起改变。',
    ],
    [
      'Start in the ground frame, press Play, and record the cart and person speeds. Those are the stored values.',
      'Switch the reference to the cart and confirm the person speed becomes vPerson - vCart, while the cart speed is 0.',
      'Switch the reference to the person and confirm the cart speed becomes vCart - vPerson.',
      'Set the two ground speeds equal and confirm each sees the other at rest.',
      'Change only the cart ground speed, return to the cart frame, and confirm every other relative velocity shifts with it.',
    ],
    [
      '换参照物就是减去该物体的地面速度，并把原点放在它上面。',
      '地面速度本身不随参照选择而改写，改的是读出来的相对速度。',
    ],
    [
      'Changing frame subtracts that object ground velocity and puts the origin on it.',
      'The stored ground velocities stay. What changes is the relative velocity you read.',
    ],
  ),

  friction: lab(
    [
      '水平面上，支持力 N = m g。拉力 F、静摩擦因数 μs、动摩擦因数 μk 可调。',
      '接触面积只影响图的大小，不进入摩擦力。按下播放看物体是否起动。',
    ],
    [
      'On a horizontal surface the normal force is N = m g. Applied force F, μs, and μk are adjustable.',
      'Contact area changes only the drawing. It does not enter the friction. Press Play to see whether the object starts.',
    ],
    [
      '令 F 小于 μs N，播放，确认物体不动，静摩擦等于 F。',
      '把 F 增到刚刚超过 μs N，确认变为滑动，摩擦力变为 μk N，方向与拉力相反。',
      '滑动后再增大 F，确认摩擦力大小仍是 μk N，加速度增大。',
      '只改变画面上的接触面积，确认摩擦力读数不变。',
      '增大质量，确认最大静摩擦和滑动摩擦都随 N = m g 增大。',
    ],
    [
      'Set F below μs N, press Play, and confirm the object stays put. Static friction matches F.',
      'Raise F just above μs N and confirm sliding starts. Friction becomes μk N, opposite the applied force.',
      'Once sliding, raise F further. Friction stays μk N and the acceleration grows.',
      'Change only the drawn contact area and confirm the friction readout does not change.',
      'Increase the mass and confirm both the maximum static friction and the kinetic friction grow with N = m g.',
    ],
    [
      '静摩擦可以小于最大静摩擦 μs N，并等于尚未拉动时的外力。',
      '滑动摩擦是 μk N，与接触面积无关。',
    ],
    [
      'Static friction can sit below its maximum μs N and match the applied force before the object moves.',
      'Kinetic friction is μk N and does not depend on contact area.',
    ],
  ),

  gravity: lab(
    [
      '重力 G = m g。质量 m 和重力场 g 可调。',
      '课堂常用地表值：地球 9.80、月球 1.62、火星 3.71，单位 m/s^2。把 g 设成这些数来比较。',
    ],
    [
      'Weight is G = m g. Mass m and gravitational field g are adjustable.',
      'Classroom surface values: Earth 9.80, Moon 1.62, Mars 3.71, in m/s^2. Set g to those numbers to compare.',
    ],
    [
      '固定 m，把 g 设为 9.80，读取 G，对照 G = m g。',
      '把 g 改为 1.62，确认同一质量的重力约为地球上的 1.62/9.80。',
      '再设 g = 3.71，确认重力介于月球和地球之间。',
      '固定 g，只把 m 加倍，确认 G 加倍。',
      '不要把质量的数字直接当成牛顿数。质量不变，g 变了，G 就变。',
    ],
    [
      'Hold m fixed, set g to 9.80, read G, and check G = m g.',
      'Set g to 1.62 and confirm the same mass weighs about 1.62/9.80 of its Earth weight.',
      'Set g to 3.71 and confirm the weight sits between the Moon and Earth values.',
      'Hold g fixed and double m. Confirm G doubles.',
      'Do not read the mass number as a force in newtons. Mass can stay fixed while G changes with g.',
    ],
    [
      '重力与质量和当地 g 都成正比。',
      '换到更小的 g，质量不变，重力变小。',
    ],
    [
      'Weight is proportional to both mass and the local g.',
      'A smaller g at the same mass means a smaller weight.',
    ],
  ),

  'half-life': lab(
    [
      '衰变曲线只按公开的计数规律：N = N0 e^(-λ t)，λ = ln 2 / T½。',
      '可调初始计数 N0、半衰期 T½ 和时间 t。',
      '不要把本课延伸成放射源、屏蔽或制备步骤。',
    ],
    [
      'The decay curve uses only the public count law N = N0 e^(-λ t), with λ = ln 2 / T½.',
      'Adjust the initial count N0, the half-life T½, and the time t.',
      'Do not extend this lesson into a source, shielding, or preparation procedure.',
    ],
    [
      '令 t = 0，确认 N = N0。',
      '令 t = T½，读取 N 和 λ，确认 N 约为 N0/2，且 λ = ln 2 / T½。',
      '令 t = 2 T½，确认 N 约为 N0/4。',
      '只增大 T½，确认同一时刻剩余份额 N/N0 变大。',
      '只改变 N0，确认曲线形状不变，各时刻的 N 同比缩放。',
    ],
    [
      'Set t = 0 and confirm N = N0.',
      'Set t = T½, read N and λ, and confirm N is about N0/2 and λ = ln 2 / T½.',
      'Set t = 2 T½ and confirm N is about N0/4.',
      'Increase only T½ and confirm the remaining fraction N/N0 is larger at the same clock time.',
      'Change only N0 and confirm the shape stays while N at each time scales with N0.',
    ],
    [
      '每过一个半衰期，计数约剩一半。',
      'λ 由半衰期决定，N0 只改变计数的起点。',
    ],
    [
      'After each half-life the count is about half of what it was.',
      'λ is set by the half-life. N0 only sets the starting count.',
    ],
  ),

  'heat-engine': lab(
    [
      '理想奥托循环的课堂模型。压缩比 r，每循环吸热 Qin，最小容积 Vmin。γ = 1.4 已固定。',
      '播放时冲程顺序是吸气、压缩、做功、排气。这是公开的热效率关系，不是发动机的制造或调试。',
    ],
    [
      'The ideal Otto cycle as a classroom model. Compression ratio r, heat in per cycle Qin, and minimum volume Vmin. γ = 1.4 is fixed.',
      'During Play the stroke order is intake, compression, power, exhaust. This is the public efficiency relation, not a build or a tune-up.',
    ],
    [
      '按下播放，记下四个冲程的顺序。',
      '读取 η、W 和 p–V 阴影面积，对照 η = 1 - 1/r^(γ-1)，W = η Qin。',
      '确认阴影面积等于净功 W，不等于 Qin。',
      '只增大 r，确认效率升高，W 在同一 Qin 下变大。',
      '只增大 Qin，确认 W 同比增大，η 不变。不要用 η = 1 - 1/r 去掉 γ 的幂。',
    ],
    [
      'Press Play and record the order of the four strokes.',
      'Read η, W, and the shaded p–V area. Check η = 1 - 1/r^(γ-1) and W = η Qin.',
      'Confirm the shaded area equals the net work W, not Qin.',
      'Increase only r and confirm the efficiency rises, so W grows at the same Qin.',
      'Increase only Qin and confirm W scales while η stays. Do not drop the γ power and write η = 1 - 1/r.',
    ],
    [
      '奥托效率由压缩比和 γ 决定，本模型 γ = 1.4。',
      '一个循环的净功是 η Qin，并等于 p–V 图上的阴影面积。',
    ],
    [
      'Otto efficiency is set by the compression ratio and γ. In this model γ = 1.4.',
      'Net work per cycle is η Qin, and it equals the shaded area on the p–V diagram.',
    ],
  ),

  'hydrogen-radial': lab(
    [
      '氢原子径向概率密度 P(r) = r^2 R_nl(r)^2，玻尔半径 a0。课堂形式覆盖 n = 1 到 4。',
      '探针 r 可读当地 P(r)。梯形积分用来核对归一化是否接近 1。',
      '只讨论这个概率密度，不讨论器件。',
    ],
    [
      'Hydrogen radial probability density P(r) = r^2 R_nl(r)^2, with Bohr radius a0. Classroom forms cover n = 1 to 4.',
      'Probe r reads P(r) there. A trapezoid integral checks that the normalisation is near 1.',
      'Stay with this probability density. Do not turn it into a device.',
    ],
    [
      '令 n = 1、l = 0，读取积分，确认它接近 1。拖动探针，找到 P(r) 的峰。',
      '改到 n = 2、l = 0，确认径向出现一个节点，主峰外移。',
      '在 n = 2 时把 l 改为 1，确认节点结构改变，且 l 不能超过 n - 1。',
      '再取 n = 3 和 n = 4 的一组允许 l，看峰继续外移，积分仍接近 1。',
      '把探针放在峰和节点上，比较 P(r)，不要把 R(r) 本身当成概率密度。',
    ],
    [
      'Set n = 1 and l = 0, read the integral, and confirm it is near 1. Drag the probe to the peak of P(r).',
      'Switch to n = 2 and l = 0 and confirm a radial node appears and the main peak moves outward.',
      'At n = 2 set l = 1 and confirm the node pattern changes. l cannot exceed n - 1.',
      'Take an allowed l at n = 3 and at n = 4. The peaks move farther out and the integral stays near 1.',
      'Park the probe on a peak and on a node and compare P(r). Do not treat R(r) itself as the probability density.',
    ],
    [
      '径向概率密度是 r^2 R_nl^2，对 r 积分接近 1。',
      'n 越大，概率质量越靠外；l 改变节点和峰的位置。',
    ],
    [
      'The radial probability density is r^2 R_nl^2, and its integral over r is near 1.',
      'Larger n moves the probability outward. l changes the nodes and the peaks.',
    ],
  ),

  'ideal-gas': lab(
    [
      '理想气体状态方程 p V = n R T，R = 8.314 J/(mol·K)。',
      '物质的量 n、温度 T、体积 V 可调。温度用开尔文。',
    ],
    [
      'Ideal gas law p V = n R T, with R = 8.314 J/(mol·K).',
      'Amount n, temperature T, and volume V are adjustable. Temperature is in kelvin.',
    ],
    [
      '记下 n、T、V，读取压强，对照 p = n R T / V。',
      '只把 V 加倍，确认 p 减半。',
      '只把 T 加倍，确认 p 加倍。',
      '只把 n 加倍，确认 p 加倍。',
      '让 T 和 V 按同一倍数增大，确认 p 不变。这就是课堂里的等压膨胀。',
    ],
    [
      'Note n, T, and V, read the pressure, and check p = n R T / V.',
      'Double only V and confirm p halves.',
      'Double only T and confirm p doubles.',
      'Double only n and confirm p doubles.',
      'Scale T and V by the same factor and confirm p stays. That is an isobaric expansion in class.',
    ],
    [
      '压强与 n、T 成正比，与 V 成反比。',
      'R 用 8.314 J/(mol·K)，T 必须是绝对温度。',
    ],
    [
      'Pressure is proportional to n and to T, and inversely proportional to V.',
      'R is 8.314 J/(mol·K), and T has to be an absolute temperature.',
    ],
  ),

  'image-charge': lab(
    [
      '接地导体平面。真实电荷 +q 在高度 h，像电荷是 -q，位于 -h。',
      '平面对 +q 的力指向平面，大小 k q^2 / (2h)^2。',
    ],
    [
      'A grounded conducting plane. Real charge +q is at height h. The image is -q at -h.',
      'The force on +q points toward the plane, with magnitude k q^2 / (2h)^2.',
    ],
    [
      '记下 q 和 h，在图上看见像电荷在平面正下方同样距离处。',
      '读取力，对照大小 k q^2 / (2h)^2，方向指向平面。',
      '把 h 减半，确认力变为 4 倍，因为距离 2h 进入平方。',
      '只增大 q，确认力按 q^2 增大。',
      '不要在导体内部再放一个真实电荷。像电荷只是满足边界的算法。',
    ],
    [
      'Note q and h and see the image the same distance below the plane.',
      'Read the force and check magnitude k q^2 / (2h)^2, toward the plane.',
      'Halve h and confirm the force becomes 4 times larger, because the distance 2h is squared.',
      'Increase only q and confirm the force scales as q^2.',
      'Do not place a second real charge inside the conductor. The image is only the stand-in that meets the boundary.',
    ],
    [
      '接地平面用 -q 在镜像位置代替。',
      '真实电荷受到的吸引力按 1/(2h)^2 变化。',
    ],
    [
      'A grounded plane is replaced by -q at the mirror position.',
      'The attractive force on the real charge follows 1/(2h)^2.',
    ],
  ),

  induction: lab(
    [
      '导体杆在间距为 ℓ 的导轨上滑动。磁通 Φ = B ℓ x，动生电动势 ε = B ℓ v。',
      '回路电阻 R 上的电流 I = ε / R。杆的位置可以拖动。',
    ],
    [
      'A rod slides on rails of width ℓ. Flux is Φ = B ℓ x and motional emf is ε = B ℓ v.',
      'With resistance R the current is I = ε / R. Drag the rod position.',
    ],
    [
      '拖动杆，改变 x，读取 Φ。确认 Φ 随 x 变化，ε 并不随 x 变化。',
      '改变速度 v，读取 ε，对照 ε = B ℓ v。v 反向时 ε 反向。',
      '令 v = 0，确认电动势和电流都为 0，即使磁通不为 0。',
      '只增大 B 或 ℓ，确认 ε 和 I 同比增大。',
      '只增大 R，确认 I = ε / R 变小，而 ε 不变。',
    ],
    [
      'Drag the rod to change x and read Φ. Flux follows x. The emf does not.',
      'Change speed v, read ε, and check ε = B ℓ v. Reversing v reverses ε.',
      'Set v = 0 and confirm both emf and current are 0 even when the flux is not.',
      'Increase only B or ℓ and confirm ε and I scale up.',
      'Increase only R and confirm I = ε / R falls while ε stays.',
    ],
    [
      '动生电动势由 B、ℓ 和 v 决定，不由杆的位置单独决定。',
      '电流是电动势除以回路电阻。',
    ],
    [
      'Motional emf is set by B, ℓ, and v, not by the rod position alone.',
      'Current is the emf divided by the loop resistance.',
    ],
  ),

  inertia: lab(
    [
      '小车和木块一起以 v0 运动。到达挡板前，这个理想模型里没有水平力。',
      '小车在 xStop 处速度变为 0。之后木块相对小车的加速度 a = -μ g。μ = 0 时木块保持匀速。',
      '按下播放。挡板位置可调。',
    ],
    [
      'Cart and block share speed v0. Before the stopper this idealisation has no horizontal force.',
      'At xStop the cart velocity becomes 0. The block then has a = -μ g from friction with the cart. μ = 0 keeps the block at constant velocity.',
      'Press Play. The stopper position is adjustable.',
    ],
    [
      '令 μ = 0，播放，确认挡板挡住小车后木块仍以 v0 前进。',
      '加上 μ，再播放，确认小车停住后木块减速，a = -μ g。',
      '只增大 μ，确认木块更快停相对小车滑行。',
      '把挡板 xStop 移近，确认共同匀速段变短，碰板前速度仍是 v0。',
      '只改变 v0，确认碰板前走得更快，碰板后的加速度仍只由 μ 和 g 决定。',
    ],
    [
      'Set μ = 0, press Play, and confirm the block keeps speed v0 after the cart hits the stopper.',
      'Turn μ on and play again. After the cart stops, the block slows with a = -μ g.',
      'Increase only μ and confirm the block finishes its slide on the cart sooner.',
      'Move the stopper closer and confirm the shared constant-speed stretch gets shorter. The speed before impact is still v0.',
      'Change only v0 and confirm the approach is faster. After impact the acceleration is still set only by μ and g.',
    ],
    [
      '挡板只改变小车的速度。木块要靠摩擦才改变速度。',
      'μ = 0 时木块惯性表现为碰板后仍做匀速运动。',
    ],
    [
      'The stopper changes the cart velocity. The block changes velocity only through friction.',
      'With μ = 0 the block inertia shows up as constant velocity after the cart stops.',
    ],
  ),

  'infinite-well': lab(
    [
      '一维无限深方势阱，从 0 到 L。量子数 n 和阱宽 L 可调。',
      '能级 E_n = n^2 π^2 ℏ^2 / (2 m L^2)，波函数 ψ_n = √(2/L) sin(n π x / L)。',
    ],
    [
      'A one-dimensional infinite square well from 0 to L. Quantum number n and width L are adjustable.',
      'Levels are E_n = n^2 π^2 ℏ^2 / (2 m L^2), and ψ_n = sqrt(2/L) sin(n π x / L).',
    ],
    [
      '令 n = 1，看波函数没有内部节点，读取 E1。',
      '改到 n = 2 和 n = 3，确认节点数是 n - 1，能量按 n^2 增大。',
      '只把 L 加倍，确认同一 n 的能量变为 1/4。',
      '在阱壁 x = 0 和 x = L 处确认波函数为 0。',
      '比较 E3/E1 是否接近 9，用来核对 n^2 这一因子。',
    ],
    [
      'Set n = 1, see a wave function with no interior node, and read E1.',
      'Switch to n = 2 and n = 3. The number of nodes is n - 1, and the energy scales as n^2.',
      'Double only L and confirm the energy at the same n falls to 1/4.',
      'At the walls x = 0 and x = L confirm the wave function is 0.',
      'Compare E3/E1 with 9 to check the n^2 factor.',
    ],
    [
      '无限深阱能量正比于 n^2 / L^2。',
      '波函数在两端为 0，内部节点数是 n - 1。',
    ],
    [
      'Infinite-well energies are proportional to n^2 / L^2.',
      'The wave function is zero at both ends, and the number of interior nodes is n - 1.',
    ],
  ),

  'internal-energy': lab(
    [
      '样品的热力学第一定律教学形式：ΔU = W + Q。',
      '传入系统的功和热都取正。W 和 Q 都可以是负的，表示离开系统。',
    ],
    [
      'First-law teaching form for a sample: ΔU = W + Q.',
      'Work and heat into the system are positive. W and Q may be negative, which means they leave the system.',
    ],
    [
      '令 W 和 Q 都为正，读取 ΔU，确认等于两者之和。',
      '令 Q = -W 且不为 0，确认 ΔU = 0。',
      '只让系统放热（Q 为负）且 W = 0，确认内能下降。',
      '只对系统做功（W 为正）且 Q = 0，确认内能上升。',
      '交换 W 和 Q 的数值，确认 ΔU 不变，因为两者地位相同。',
    ],
    [
      'Set both W and Q positive, read ΔU, and confirm it equals their sum.',
      'Set Q = -W with neither equal to 0 and confirm ΔU = 0.',
      'Let the system lose heat only (Q negative, W = 0) and confirm the internal energy falls.',
      'Do work on the system only (W positive, Q = 0) and confirm the internal energy rises.',
      'Swap the numbers in W and Q and confirm ΔU is unchanged, because they enter on the same footing.',
    ],
    [
      '内能变化是传入的功加上传入的热。',
      '功和热可以彼此抵消，使 ΔU 为 0。',
    ],
    [
      'The change in internal energy is work in plus heat in.',
      'Work and heat can cancel, leaving ΔU = 0.',
    ],
  ),

  ising: lab(
    [
      'N×N 的二维伊辛格子，哈密顿量 H = -J Σ s_i s_j，J = 1。用 Metropolis 更新。',
      '播放时温度从 Tmin 扫到 Tmax，并画出 |M|(T)。Onsager 临界温度 Tc = 2 / ln(1 + √2)。',
      'paint step 取 2 或 3 时，大格子每隔若干格才重画，用来省时间。',
    ],
    [
      'A 2-D Ising lattice, N by N, with H = -J Σ s_i s_j and J = 1, updated by Metropolis.',
      'Play sweeps temperature from Tmin to Tmax and plots |M|(T). The Onsager critical temperature is Tc = 2 / ln(1 + sqrt(2)).',
      'Paint step 2 or 3 redraws every nth cell on a large lattice, to cut the cost.',
    ],
    [
      '先用较小的 N，按下播放，看 |M| 随 T 从高到低的变化，并标出 Tc。',
      '把探针 T 放在 Tc 以下，看自旋成片同向，|M| 明显不为 0。',
      '把探针 T 放在 Tc 以上，看自旋更乱，|M| 接近 0。',
      '改变种子或扫描次数，确认定性的 |M|(T) 台阶仍在 Tc 附近，单次构型会有涨落。',
      '换更大的 N 时把 paint step 设为 2 或 3，确认降采样只影响绘制，不改变 H 的定义。',
    ],
    [
      'Start with a modest N, press Play, and watch |M| against T. Mark Tc.',
      'Put the probe T below Tc and see spins cluster. |M| is clearly away from 0.',
      'Put the probe T above Tc and see a more mixed lattice. |M| sits near 0.',
      'Change the seed or the number of sweeps. The qualitative |M|(T) step stays near Tc, while a single configuration still fluctuates.',
      'On a larger N set paint step to 2 or 3. The skip affects drawing only. It does not change the definition of H.',
    ],
    [
      '零场二维伊辛模型在 Tc = 2 / ln(1 + √2) 两侧，|M| 从有限值掉到接近 0。',
      '能量是最近邻自旋的耦合，J = 1。',
    ],
    [
      'The zero-field 2-D Ising model drops |M| from a finite value toward 0 across Tc = 2 / ln(1 + sqrt(2)).',
      'The energy is nearest-neighbour coupling with J = 1.',
    ],
  ),

  'kinetic-gas': lab(
    [
      '分子动理论的教学形式 p = (1/3) ρ v_rms^2。',
      '密度 ρ 和方均根速率可调。这不是完整的速率分布图。',
    ],
    [
      'Kinetic-theory teaching form p = (1/3) ρ v_rms^2.',
      'Density ρ and the rms speed are adjustable. This is not the full speed distribution.',
    ],
    [
      '记下 ρ 和 v_rms，读取压强。',
      '对照 p = (1/3) ρ v_rms^2。',
      '只把 v_rms 加倍，确认压强变为 4 倍。',
      '只把 ρ 加倍，确认压强加倍。',
      '让 ρ 减半且 v_rms 加倍，确认压强变为 2 倍，因为速率进入平方。',
    ],
    [
      'Note ρ and v_rms and read the pressure.',
      'Check p = (1/3) ρ v_rms^2.',
      'Double only v_rms and confirm the pressure becomes 4 times larger.',
      'Double only ρ and confirm the pressure doubles.',
      'Halve ρ and double v_rms and confirm the pressure doubles, because speed enters as a square.',
    ],
    [
      '压强正比于密度，也正比于方均根速率的平方。',
      '系数是 1/3，不要写成 ρ v_rms^2 本身。',
    ],
    [
      'Pressure is proportional to density and to the square of the rms speed.',
      'The factor is 1/3. Do not drop it and use ρ v_rms^2 alone.',
    ],
  ),

  'laser-cavity': lab(
    [
      '法布里–珀罗腔只读频率间隔 Δν = c / (2 L)。腔长 L 可调。',
      '本课不讲如何制备增益介质，也不讲泵浦。',
    ],
    [
      'A Fabry–Pérot cavity reports only the frequency spacing Δν = c / (2 L). Cavity length L is adjustable.',
      'This lesson does not describe how to prepare a gain medium or how to pump one.',
    ],
    [
      '记下 L，读取 Δν，对照 Δν = c / (2 L)。',
      '把 L 加倍，确认间隔减半。',
      '把 L 缩短，确认相邻模式在频率上分得更开。',
      '用 c = 3.00×10^8 m/s 心算一次，和读数比较。',
      '不要把 Δν 读成输出功率或波长锁定步骤。',
    ],
    [
      'Note L, read Δν, and check Δν = c / (2 L).',
      'Double L and confirm the spacing halves.',
      'Shorten L and confirm neighbouring modes sit farther apart in frequency.',
      'Estimate once with c = 3.00×10^8 m/s and compare with the readout.',
      'Do not read Δν as an output power or as a locking procedure.',
    ],
    [
      '纵模间隔与腔长成反比。',
      '本模型只给出这个频率间隔。',
    ],
    [
      'Longitudinal mode spacing is inversely proportional to cavity length.',
      'This model supplies only that frequency spacing.',
    ],
  ),

  'length-contraction': lab(
    [
      '长度收缩的教学关系 ℓ = ℓ0 / γ，γ = 1/√(1 - v^2/c^2)。',
      '固有长度 ℓ0 和速率 v 可调。只比较这两个长度，不讨论测量装置的制造。',
    ],
    [
      'Length contraction as a teaching relation: ℓ = ℓ0 / γ, with γ = 1/sqrt(1 - v^2/c^2).',
      'Proper length ℓ0 and speed v are adjustable. Compare those two lengths only. Do not turn this into building a measuring device.',
    ],
    [
      '把 v 调得很小，读取 γ 和 ℓ，确认 ℓ 几乎等于 ℓ0。',
      '增大 v，确认 γ 增大、ℓ 变短。',
      '只把 ℓ0 加倍，确认收缩后的长度也加倍，γ 不变。',
      '在同一个 v 下核对 ℓ0 / ℓ = γ。',
      '不要把 ℓ 读成物体在自身静止系里变短。变短的是相对运动系中的长度。',
    ],
    [
      'Set v very small, read γ and ℓ, and confirm ℓ is almost ℓ0.',
      'Increase v and confirm γ rises while ℓ shortens.',
      'Double only ℓ0 and confirm the contracted length doubles. γ is unchanged.',
      'At one fixed v check ℓ0 / ℓ = γ.',
      'Do not read ℓ as the object shrinking in its own rest frame. The shorter length is the one in the frame where it moves.',
    ],
    [
      '运动长度是固有长度除以 γ。',
      'v 远小于 c 时，收缩可以忽略。',
    ],
    [
      'The moving length is the proper length divided by γ.',
      'When v is far below c, the contraction is negligible.',
    ],
  ),

  lever: lab(
    [
      '杠杆上的两个力都垂直于棒，所以力臂就是到支点的距离。',
      '拖动两侧力的作用点改变 L1 和 L2。平衡条件是 F1 L1 = F2 L2。',
    ],
    [
      'Both forces are perpendicular to the bar, so each moment arm is the distance from the fulcrum.',
      'Drag the points of application to change L1 and L2. Balance is F1 L1 = F2 L2.',
    ],
    [
      '先设 F1 L1 = F2 L2，看杠杆平衡，读取两侧力矩。',
      '只拖长 L1，确认动力矩变大，杠杆向这一侧转动。',
      '再增大 F2，把 F2 L2 调回等于 F1 L1，确认重新平衡。',
      '把 L2 缩短为一半，确认需要大约两倍的 F2 才能平衡。',
      '两侧力都增大同一倍数，确认仍然平衡，因为等式两边同比放大。',
    ],
    [
      'Start with F1 L1 = F2 L2 and see the lever balance. Read both moments.',
      'Drag L1 longer only and confirm the effort moment grows, so the bar turns that way.',
      'Increase F2 until F2 L2 again equals F1 L1, and confirm balance returns.',
      'Shorten L2 to half and confirm F2 must be about twice as large to balance.',
      'Scale both forces by the same factor and confirm balance remains, because both sides of the equation scale together.',
    ],
    [
      '力垂直于棒时，平衡就是 F1 L1 = F2 L2。',
      '力臂是到支点的距离，不是沿棒的其他投影。',
    ],
    [
      'With the forces perpendicular to the bar, balance is F1 L1 = F2 L2.',
      'The moment arm is the distance from the fulcrum, not some other projection along the bar.',
    ],
  ),

  'liquid-pressure': lab(
    [
      '液体压强有三种视图：深度、U 型管、容器底部。',
      '深度视图里可拖动深度。计示压强 p = ρ g h。',
      'U 型管平衡是 ρ1 h1 = ρ2 h2。同一深度压强相同，但底部受力 pA 与面积有关。',
    ],
    [
      'Liquid pressure has three views: depth, U-tube, and vessel base.',
      'In the depth view, drag the depth. Gauge pressure is p = ρ g h.',
      'U-tube balance is ρ1 h1 = ρ2 h2. The same depth means the same pressure, but the force on a base is pA and does depend on area.',
    ],
    [
      '在深度视图拖动 h，读取 p，对照 p = ρ g h。只增大 ρ 或 g，确认 p 同比增大。',
      '换到容器底部，比较宽底和窄底：同一深度 p 相同，力 F = p A 不同。',
      '改变 A1 和 A2，确认力随面积变，压强不变。',
      '换到 U 型管，记下左管 h1 和 ρ，读取右管 h2。',
      '对照 ρ1 h1 = ρ2 h2。增大右管密度 ρ2，确认 h2 变小。',
    ],
    [
      'In the depth view drag h, read p, and check p = ρ g h. Increase only ρ or g and confirm p scales.',
      'Switch to the vessel base and compare wide and narrow bases. At the same depth p is the same and the force F = p A is not.',
      'Change A1 and A2 and confirm the forces follow area while the pressure does not.',
      'Switch to the U-tube, note left-column h1 and ρ, and read the right-column h2.',
      'Check ρ1 h1 = ρ2 h2. Increase the right-hand density ρ2 and confirm h2 falls.',
    ],
    [
      '计示压强是 ρ g h，与容器形状无关。',
      '底部受力还要乘面积。U 型管两侧 ρ h 相等。',
    ],
    [
      'Gauge pressure is ρ g h and does not depend on the shape of the vessel.',
      'Force on a base still multiplies by area. A U-tube balances ρ h on the two sides.',
    ],
  ),

  lorentz: lab(
    [
      '速度垂直于磁场时，洛伦兹力大小 F = |q| v B。',
      '正电荷的方向按右手定则。q、v、B 可调。',
    ],
    [
      'When velocity is perpendicular to B, the Lorentz force magnitude is F = |q| v B.',
      'The sense for a positive charge follows the right-hand rule. q, v, and B are adjustable.',
    ],
    [
      '取 q 为正，读取 F 的大小和方向，对照 F = |q| v B。',
      '只增大 v 或 B，确认力同比增大，方向不变。',
      '把 q 改为负，确认力反向，大小仍由绝对值决定。',
      '令 v = 0 或 B = 0，确认力为 0。',
      '不要把这个垂直情形的公式用于速度与 B 不垂直的情况。本模型假定它们垂直。',
    ],
    [
      'Take q positive and read the size and sense of F. Check F = |q| v B.',
      'Increase only v or only B and confirm the force scales, sense unchanged.',
      'Make q negative and confirm the force reverses. The magnitude still uses the absolute charge.',
      'Set v = 0 or B = 0 and confirm the force is 0.',
      'Do not use this perpendicular formula when velocity is not perpendicular to B. This model assumes that it is.',
    ],
    [
      '垂直时洛伦兹力的大小是电荷绝对值、速率和磁感应强度的乘积。',
      '电荷变号，力的方向变号。',
    ],
    [
      'When v is perpendicular to B, the Lorentz force magnitude is absolute charge times speed times field.',
      'Flipping the sign of the charge flips the sense of the force.',
    ],
  ),

  malus: lab(
    [
      '两片偏振器，入射强度 I0，透振方向夹角 θ。',
      '马吕斯定律 I = I0 cos^2 θ。θ 从 0 到 90°。',
    ],
    [
      'Two polarisers, incident intensity I0, and angle θ between the transmission axes.',
      'Malus’s law is I = I0 cos^2 θ. θ runs from 0 to 90°.',
    ],
    [
      '令 θ = 0，读取 I，确认等于 I0。',
      '令 θ = 90°，确认 I = 0。',
      '令 θ = 60°，对照 cos^2 60° = 0.25，I = I0/4。',
      '只增大 I0，确认各角度的 I 同比增大，零点仍在 90°。',
      '从 0 扫到 90，确认强度按 cos^2 θ 下降，而不是按 cos θ 直线下降。',
    ],
    [
      'Set θ = 0, read I, and confirm it equals I0.',
      'Set θ = 90° and confirm I = 0.',
      'Set θ = 60° and check cos^2 60° = 0.25, so I = I0/4.',
      'Increase only I0 and confirm I scales at every angle. The zero stays at 90°.',
      'Sweep θ from 0 to 90 and confirm the intensity falls as cos^2 θ, not as a straight cos θ.',
    ],
    [
      '透过第二片偏振器的强度是 I0 cos^2 θ。',
      '夹角 90° 时强度为 0。',
    ],
    [
      'Intensity through the second polariser is I0 cos^2 θ.',
      'At 90° the intensity is 0.',
    ],
  ),

  'mass-energy': lab(
    [
      '公开的质能关系 E = m c^2，c = 2.99792458×10^8 m/s。',
      '只改变质量并读静止能量。不要把本课写成产能、当量或装置步骤。',
    ],
    [
      'The public mass–energy relation E = m c^2, with c = 2.99792458×10^8 m/s.',
      'Change the mass and read the rest energy. Do not turn this lesson into a yield, an equivalent, or a device procedure.',
    ],
    [
      '记下质量 m，读取 E。',
      '用 E = m c^2 和给出的 c 心算，与读数对照。',
      '把 m 加倍，确认 E 加倍。',
      '把 m 改为画面允许的最小值和最大值，确认能量仍正比于 m，c 不变。',
      '不要把 E 除以某个体积或时间，去发明一个功率或密度。画面没有这些量。',
    ],
    [
      'Note the mass m and read E.',
      'Compute E = m c^2 with the stated c and compare it with the readout.',
      'Double m and confirm E doubles.',
      'Set m to the smallest and largest values the stage allows and confirm energy stays proportional to m. c does not change.',
      'Do not divide E by a volume or a time to invent a power or a density. Those quantities are not on the stage.',
    ],
    [
      '静止能量与质量成正比，比例是 c^2。',
      '本课只提供这个换算。',
    ],
    [
      'Rest energy is proportional to mass, with factor c^2.',
      'This lesson supplies only that conversion.',
    ],
  ),

  'maxwell-speed': lab(
    [
      '麦克斯韦–玻尔兹曼速率分布 f(v) = √(2/π) (v^2 / a^3) e^(-v^2 / (2 a^2))，a = √(k T / m)。',
      '直方条是对这个概率密度的抽样。拖动最可几速率标记会反过来改温度。',
      '比较 vmp、平均速率和 vrms。',
    ],
    [
      'Maxwell–Boltzmann speed distribution f(v) = sqrt(2/π) (v^2 / a^3) e^(-v^2 / (2 a^2)), with a = sqrt(k T / m).',
      'The histogram bars sample that pdf. Dragging the most-probable-speed marker changes the temperature to match.',
      'Compare vmp, the mean speed, and vrms.',
    ],
    [
      '记下 T 和 m，读取 vmp、平均速率和 vrms，确认 vmp < 平均速率 < vrms。',
      '只提高 T，确认分布变宽、峰值向高速移动。',
      '只增大 m，确认分布变窄、峰值向低速移动。',
      '拖动 vmp 标记，看温度跟着变，因为最可几速率决定于 T/m。',
      '改变直方条数，确认条形更细或更粗，但曲线公式不变。',
    ],
    [
      'Note T and m and read vmp, the mean speed, and vrms. Confirm vmp < mean speed < vrms.',
      'Raise only T and confirm the distribution widens and the peak moves to higher speed.',
      'Increase only m and confirm the distribution narrows and the peak moves to lower speed.',
      'Drag the vmp marker and watch the temperature follow, because the most probable speed is set by T/m.',
      'Change the bin count and confirm the bars get finer or coarser. The pdf formula stays the same.',
    ],
    [
      '速率分布的宽度由 a = √(k T / m) 决定。',
      '三种特征速率的顺序是最可几、平均、方均根。',
    ],
    [
      'The width of the speed distribution is set by a = sqrt(k T / m).',
      'The three characteristic speeds run most probable, then mean, then rms.',
    ],
  ),

  'maxwell-wave': lab(
    [
      '真空中 c = 1/√(μ0 ε0) = f λ。平面波的 E 和 B 同相，且 |B| = |E| / c。',
      '位移电流密度 Jd = ε0 ∂E/∂t，是麦克斯韦方程的教学读数，不是器件。',
      '频率 f 和 E 的振幅可调。按下播放。',
    ],
    [
      'In vacuum c = 1/sqrt(μ0 ε0) = f λ. A plane wave keeps E and B in phase, with |B| = |E| / c.',
      'The displacement-current density Jd = ε0 ∂E/∂t is a teaching readout from Maxwell, not a device.',
      'Frequency f and the E amplitude are adjustable. Press Play.',
    ],
    [
      '按下播放，读取波长，对照 c = f λ，c 来自 1/√(μ0 ε0)。',
      '只增大 f，确认 λ 变短，E 与 B 仍同相。',
      '读取 |B|，对照 |B| = |E| / c。只增大 E 的振幅时 |B| 同比增大。',
      '在波峰和过零点暂停，比较 Jd。过零附近 ∂E/∂t 大，Jd 也大。',
      '不要把 Jd 读成导线里的传导电流，也不要据此设计天线。',
    ],
    [
      'Press Play, read the wavelength, and check c = f λ, with c from 1/sqrt(μ0 ε0).',
      'Increase only f and confirm λ shortens. E and B stay in phase.',
      'Read |B| and check |B| = |E| / c. Raising only the E amplitude scales |B| with it.',
      'Pause on a crest and on a zero crossing and compare Jd. Near a crossing ∂E/∂t is large, so Jd is large.',
      'Do not read Jd as a conduction current in a wire, and do not design an antenna from it.',
    ],
    [
      '真空光速把频率和波长联系起来，也把 |E| 和 |B| 联系起来。',
      '位移电流密度跟着电场的时间变化。',
    ],
    [
      'The vacuum speed of light links frequency to wavelength, and it also links |E| to |B|.',
      'Displacement-current density follows the time derivative of the electric field.',
    ],
  ),

  melting: lab(
    [
      '恒定功率 P 加热样品。晶体开关打开时才有熔化平台。',
      '平台外 Q = m c ΔT，平台上 Q = m Lf，温度停在熔点。',
      '在 T–t 图上拖动时间，或用播放。',
    ],
    [
      'A sample heated at constant power P. The melting plateau appears only when the crystal switch is on.',
      'Off the plateau Q = m c ΔT. On it Q = m Lf, and the temperature stays at the melting point.',
      'Drag time on the T–t graph, or use Play.',
    ],
    [
      '打开晶体，从初温播放到平台前，确认温度上升。',
      '拖到平台上，确认温度停在熔点 Tm，而已熔化份额和 Q 仍在增加。',
      '拖过平台，确认全部熔化后温度再次上升。',
      '关掉晶体再播放，确认没有潜热平台，温度一路上升。',
      '增大 m 或减小 P，确认平台来得更晚、持续更久。',
    ],
    [
      'With the crystal on, play from the start temperature up to the plateau and confirm the temperature rises.',
      'Drag onto the plateau and confirm the temperature stays at the melting point Tm while the melted fraction and Q still increase.',
      'Drag past the plateau and confirm the temperature climbs again after melting finishes.',
      'Turn the crystal off and play again. There is no latent-heat plateau, and the temperature keeps rising.',
      'Increase m or lower P and confirm the plateau starts later and lasts longer.',
    ],
    [
      '晶体熔化时吸热而温度不变，热量是 m Lf。',
      '没有晶体开关时，这个模型不出现平台。',
    ],
    [
      'A crystal absorbs heat at the melting point without a temperature rise. That heat is m Lf.',
      'With the crystal switch off, this model has no plateau.',
    ],
  ),

  membrane: lab(
    [
      '矩形膜的本征模，边长 a、b，波速 c，模数 m、n。',
      'u_mn = sin(m π x / a) sin(n π y / b) cos(ω t)，ω = π c √((m/a)^2 + (n/b)^2)。',
      '按下播放看节线。',
    ],
    [
      'A rectangular-membrane eigenmode, sides a and b, wave speed c, and indices m and n.',
      'u_mn = sin(m π x / a) sin(n π y / b) cos(ω t), with ω = π c √((m/a)^2 + (n/b)^2).',
      'Press Play and watch the nodal lines.',
    ],
    [
      '令 m = 1、n = 1，播放，确认膜心起伏、四边不动，没有内部节线。',
      '改到 m = 2、n = 1，确认沿 a 方向多一条节线，并读取 ω。',
      '对照 ω = π c √((m/a)^2 + (n/b)^2)。只增大 c，确认频率同比升高。',
      '只增大 a，确认同一模的频率下降。',
      '交换 m 和 n，若 a 不等于 b，确认频率不同。',
    ],
    [
      'Set m = 1 and n = 1, press Play, and confirm the centre moves, the edges stay fixed, and there is no interior node line.',
      'Switch to m = 2 and n = 1, confirm one extra node line along side a, and read ω.',
      'Check ω = π c √((m/a)^2 + (n/b)^2). Increase only c and confirm the frequency scales up.',
      'Increase only a and confirm the frequency of the same mode falls.',
      'Swap m and n. If a is not equal to b, the frequency changes.',
    ],
    [
      '膜的边缘始终为 0。节线数由 m 和 n 决定。',
      '频率随波速升高，随边长增大而降低。',
    ],
    [
      'The membrane edge stays at 0. The node lines are set by m and n.',
      'Frequency rises with wave speed and falls as a side gets longer.',
    ],
  ),

  'normal-modes': lab(
    [
      '两端固定，两个相等质量，三根相等弹簧。',
      '对称模频率 √(k/m)，反对称模频率 √(3k/m)。一般初值是这两个模的叠加。',
      'A1 是对称模振幅，A2 是反对称模振幅。按下播放。',
    ],
    [
      'Walls fixed, two equal masses, three equal springs.',
      'The symmetric frequency is √(k/m) and the antisymmetric frequency is √(3k/m). A general start is the sum of those two modes.',
      'A1 is the symmetric amplitude and A2 the antisymmetric amplitude. Press Play.',
    ],
    [
      '令 A2 = 0、A1 不为 0，播放，看两质量同向运动，读取对称频率 √(k/m)。',
      '令 A1 = 0、A2 不为 0，看两质量反向运动，频率变为 √(3k/m)，比对称模高。',
      '两个振幅都不要为 0，确认运动是两个频率的叠加，不再是单一周期。',
      '只增大 k，确认两个频率都升高。',
      '只增大 m，确认两个频率都降低，频率比仍是 √3。',
    ],
    [
      'Set A2 = 0 and A1 away from 0. Press Play and watch the masses move together. Read the symmetric frequency √(k/m).',
      'Set A1 = 0 and A2 away from 0. The masses move oppositely at √(3k/m), higher than the symmetric mode.',
      'Leave both amplitudes away from 0 and confirm the motion is a sum of two frequencies, not one period.',
      'Increase only k and confirm both frequencies rise.',
      'Increase only m and confirm both frequencies fall. Their ratio stays √3.',
    ],
    [
      '对称模频率是 √(k/m)，反对称模是 √(3k/m)。',
      '一般运动是这两个模相加，所以会看到拍状的强弱变化。',
    ],
    [
      'The symmetric frequency is √(k/m) and the antisymmetric frequency is √(3k/m).',
      'A general motion adds those modes, so the strength of the motion rises and falls.',
    ],
  ),

  oscillator: lab(
    [
      '一根弹簧连接一个质量。x = A cos(ω t)，ω = √(k/m)。',
      '拉格朗日量 L = ½ m v^2 - ½ k x^2，哈密顿量 H = ½ m v^2 + ½ k x^2。',
      '欧拉–拉格朗日方程在这里就是 m a = -k x。H 保持为 ½ k A^2。按下播放。',
    ],
    [
      'One spring and one mass. x = A cos(ω t), with ω = √(k/m).',
      'The Lagrangian is L = (1/2) m v^2 - (1/2) k x^2 and the Hamiltonian is H = (1/2) m v^2 + (1/2) k x^2.',
      'Here the Euler–Lagrange equation is the same statement as m a = -k x. H stays at (1/2) k A^2. Press Play.',
    ],
    [
      '播放一个周期，读取 x 和能量，确认 H 几乎不变，等于 ½ k A^2。',
      '在最大位移处暂停，确认动能接近 0、势能最大。',
      '在平衡位置暂停，确认势能接近 0、动能最大，两者之和仍是 H。',
      '只增大 m 或减小 k，确认周期变长，ω = √(k/m) 变小，而 H 在 A 不变时不随 m 改变。',
      '只增大 A，确认能量按 A 的平方增大，平衡位置的最大速度也增大。',
    ],
    [
      'Play one period, read x and the energy, and confirm H stays nearly constant at (1/2) k A^2.',
      'Pause at maximum displacement and confirm kinetic energy is near 0 while potential energy is largest.',
      'Pause at equilibrium and confirm potential energy is near 0 while kinetic energy is largest. Their sum is still H.',
      'Increase m or decrease k and confirm the period grows, so ω = √(k/m) falls. At fixed A, H does not depend on m.',
      'Increase only A and confirm the energy scales as A squared, and the top speed at equilibrium rises.',
    ],
    [
      '简谐运动的 ω 由 √(k/m) 决定，总能量保持 ½ k A^2。',
      '欧拉–拉格朗日方程给出的就是 m a = -k x。',
    ],
    [
      'The angular frequency of the harmonic motion is √(k/m), and the total energy stays at (1/2) k A^2.',
      'The Euler–Lagrange equation here is the same statement as m a = -k x.',
    ],
  ),

  'pendulum-pair': lab(
    [
      '单摆从静止释放，方程 θ′′ = -(g/L) sin θ，用固定步长龙格–库塔积分。',
      '第二只摆的初角只差 δθ。单位质量能量是 ½ (L θ′)^2 + g L (1 - cos θ)。',
      '摆长 L、g、初始角度和 δθ 可调，角度单位是弧度。按下播放。大角度不要换成 sin θ ≈ θ。',
    ],
    [
      'A pendulum released from rest. θ′′ = -(g/L) sin θ, integrated with fixed-step Runge–Kutta.',
      'A second pendulum starts δθ away. Energy per unit mass is (1/2) (L θ′)^2 + g L (1 - cos θ).',
      'Length L, g, the start angle, and δθ are adjustable. Angles are in radians. Press Play. At large angles do not replace sin θ by θ.',
    ],
    [
      '用较小的初始角度播放，看两摆几乎同步，读取周期大约 2π √(L/g)。',
      '把初始角度调大，确认周期变长，不再等于小角周期。',
      '读取单位质量能量，确认单摆摆动中它大致守恒。',
      '增大 δθ，确认两摆很快分开，这就是对初值的敏感。',
      '只增大 L 或减小 g，确认摆动变慢。',
    ],
    [
      'Play from a small start angle and watch the two pendulums stay nearly together. The period is about 2π √(L/g).',
      'Raise the start angle and confirm the period grows beyond the small-angle period.',
      'Read the energy per unit mass and confirm it stays about constant through the swing.',
      'Increase δθ and confirm the two pendulums separate. That is sensitivity to the start.',
      'Increase only L or decrease g and confirm the swing slows.',
    ],
    [
      '大角度单摆用 sin θ，周期随振幅变大。',
      '能量按单位质量守恒，但差一个 δθ 的两只摆可以走散。',
    ],
    [
      'The large-angle pendulum keeps sin θ, and the period grows with amplitude.',
      'Energy per unit mass is conserved, but two pendulums that start δθ apart can drift apart.',
    ],
  ),

  photoelectric: lab(
    [
      '爱因斯坦光电关系 Kmax = h f - W，截止频率 f0 = W / h。逸出功 W 用 eV 输入。',
      '只比较频率、逸出功和最大动能。不要把本课写成光电管的制作或电路调试。',
    ],
    [
      'Einstein photoelectric relation Kmax = h f - W, with cutoff f0 = W / h. Work function W is entered in eV.',
      'Compare frequency, work function, and maximum kinetic energy only. Do not turn this into building a photocell or tuning a circuit.',
    ],
    [
      '把 f 设在 f0 以下，读取 Kmax 和是否出射，确认不出射，Kmax 不是正的。',
      '把 f 调到刚刚高于 f0，确认开始出射，Kmax 接近 0。',
      '继续增大 f，确认 Kmax 线性增加，斜率对应 h。',
      '只增大 W，确认 f0 = W / h 升高，同一 f 下 Kmax 下降。',
      '在截止点核对 h f0 = W，不要把 Kmax 写成 W - h f。',
    ],
    [
      'Set f below f0, read Kmax and whether electrons leave, and confirm they do not. Kmax is not positive.',
      'Raise f just above f0 and confirm emission starts with Kmax near 0.',
      'Raise f further and confirm Kmax increases linearly, with a slope set by h.',
      'Increase only W and confirm f0 = W / h rises, so Kmax at the same f falls.',
      'At cutoff check h f0 = W. Do not write Kmax as W - h f.',
    ],
    [
      '最大动能是 h f 减去逸出功，频率低于 W/h 时没有出射。',
      '本课只使用这个关系。',
    ],
    [
      'Maximum kinetic energy is h f minus the work function. Below W/h there is no emission.',
      'This lesson uses only that relation.',
    ],
  ),

  pinhole: lab(
    [
      '小孔成像用相似三角形。物高 H、物距 u、屏距 v、孔径 d 可调。',
      '光斑直径按 d (u + v) / u，这是有限孔的几何半影。衍射不在本模型里。',
      '可拖动物和屏。',
    ],
    [
      'A pinhole image uses similar triangles. Object height H, object distance u, screen distance v, and hole diameter d are adjustable.',
      'Spot diameter is d (u + v) / u, the geometric penumbra of a finite hole. Diffraction is outside this model.',
      'Drag the object and the screen.',
    ],
    [
      '拖动物距和屏距，看像的上下是否颠倒，用相似三角形核对像高。',
      '读取光斑直径，对照 d (u + v) / u。',
      '只减小 d，确认光斑变小、图更接近理想光线。',
      '只增大 u，确认同一孔径下光斑变小。',
      '只增大 v，确认光斑变大。不要把边缘的模糊读成衍射条纹。',
    ],
    [
      'Drag the object distance and the screen distance. See whether the image is inverted, and check its height with similar triangles.',
      'Read the spot diameter and check d (u + v) / u.',
      'Decrease only d and confirm the spot shrinks and the picture sits closer to ideal rays.',
      'Increase only u and confirm the spot shrinks for the same hole.',
      'Increase only v and confirm the spot grows. Do not read the soft edge as a diffraction fringe.',
    ],
    [
      '小孔像的大小来自相似三角形，模糊来自有限孔径的几何半影。',
      '本模型不计算衍射。',
    ],
    [
      'Pinhole image size comes from similar triangles. The blur is the geometric penumbra of a finite hole.',
      'This model does not compute diffraction.',
    ],
  ),

  'plane-mirror': lab(
    [
      '平面镜。物到镜面的距离 d 和物高 h 可调，物体可以拖动。',
      '像在镜后等远处，虚像、正立、等大，并且左右对调。',
    ],
    [
      'A plane mirror. Object distance d and height h are adjustable, and the object can be dragged.',
      'The image is as far behind the mirror as the object is in front. It is virtual, erect, the same size, and laterally reversed.',
    ],
    [
      '拖动物体靠近或远离镜面，读取像距，确认与物距相等。',
      '改变物高，确认像高始终等于物高。',
      '看像的方向：正立，但左右与物体对调。',
      '确认光屏放在镜后接不到这个像，因为它是虚像。',
      '把 d 加倍，确认像也退后同样的距离，大小不变。',
    ],
    [
      'Drag the object toward and away from the mirror, read the image distance, and confirm it equals the object distance.',
      'Change the object height and confirm the image height stays equal to it.',
      'Check the image: erect, and left-right reversed relative to the object.',
      'A screen behind the mirror does not catch this image, because it is virtual.',
      'Double d and confirm the image retreats by the same distance. Its size does not change.',
    ],
    [
      '平面镜成像：等距、等大、正立、虚像，并且左右对调。',
      '像距等于物距，不随物高改变。',
    ],
    [
      'A plane-mirror image is equally far, the same size, erect, virtual, and laterally reversed.',
      'Image distance equals object distance and does not depend on object height.',
    ],
  ),

  'point-field': lab(
    [
      '点电荷的电场在径向线上，E = k |q| / r^2。距离 r 可以拖动。',
      'q > 0 时场指向外，q < 0 时场指向电荷。',
    ],
    [
      'The field of a point charge on the radial line is E = k |q| / r^2. Drag the distance r.',
      'The field points away if q > 0 and toward the charge if q < 0.',
    ],
    [
      '拖动 r，读取 E，对照 E = k |q| / r^2。',
      '把 r 加倍，确认场强约为原来的 1/4。',
      '只增大 |q|，确认 E 同比增大。',
      '把 q 从正改为负，确认箭头反向，大小不变。',
      '不要用距离的一次方去拟合。平方关系在加倍 r 时最容易看出来。',
    ],
    [
      'Drag r, read E, and check E = k |q| / r^2.',
      'Double r and confirm the field falls to about 1/4.',
      'Increase only |q| and confirm E scales with it.',
      'Change q from positive to negative and confirm the arrow reverses while the magnitude stays.',
      'Do not fit the field with a single power of distance. Doubling r makes the square easy to see.',
    ],
    [
      '点电荷场强与电量成正比，与距离平方成反比。',
      '场的方向由电荷正负决定。',
    ],
    [
      'The point-charge field is proportional to charge and inversely proportional to distance squared.',
      'The direction is set by the sign of the charge.',
    ],
  ),

  projectile: lab(
    [
      '水平抛出，不计空气阻力。水平初速 v0，抛出高度 H，重力加速度 g。',
      'x = v0 t，y = H - ½ g t^2，y 是离地面的高度。频闪是同一公式的等时间隔。',
      '按下播放。没有可拖的抛出点，用参数改变 v0 和 H。',
    ],
    [
      'Horizontal launch, no air resistance. Horizontal speed v0, release height H, and gravitational field g.',
      'x = v0 t and y = H - (1/2) g t^2, with y the height above the floor. Strobes are equal time steps of those same equations.',
      'Press Play. There is no draggable release point. Change v0 and H with the controls.',
    ],
    [
      '播放到落地，读取飞行时间，对照 H = ½ g t^2。',
      '读取落地点的水平距离，对照 x = v0 t，t 用上一步的时间。',
      '只增大 v0，确认落地时间不变、射程增大。',
      '只增大 H，确认飞行时间变长，射程也变大。',
      '看频闪点水平间隔相等、竖直间隔向下越来越大。',
    ],
    [
      'Play until landing and read the flight time. Check H = (1/2) g t^2.',
      'Read the horizontal distance at landing and check x = v0 t, using that flight time.',
      'Increase only v0 and confirm the flight time stays while the range grows.',
      'Increase only H and confirm both the flight time and the range grow.',
      'Look at the strobes: equal gaps horizontally, and vertical gaps that grow downward.',
    ],
    [
      '水平方向匀速，竖直方向是自由落体。',
      '落地时间只由 H 和 g 决定，射程还要乘上 v0。',
    ],
    [
      'Horizontal motion is uniform. Vertical motion is free fall.',
      'Flight time depends only on H and g. Range multiplies that time by v0.',
    ],
  ),

  pulley: lab(
    [
      '理想细绳。n 段绳子承担物重和动滑轮重。',
      '拉力 F = (G + Gp) / n。绳端移动的距离是重物上升距离的 n 倍。',
      '效率 η = G h / (F s)。可以拖动绳端。',
    ],
    [
      'An ideal string. n segments support the load and the movable pulley.',
      'The pull is F = (G + Gp) / n. The rope end moves n times as far as the load.',
      'Efficiency is η = G h / (F s). Drag the rope end.',
    ],
    [
      '记下 n、G 和 Gp，读取 F，对照 F = (G + Gp) / n。',
      '拖动绳端，读取绳端距离 s 和重物上升 h，确认 s = n h。',
      '读取效率，对照 η = G h / (F s)。Gp 不为 0 时效率小于 1。',
      '令 Gp = 0，确认 F = G / n，且 η = 1。',
      '只增加段数 n，确认更省力，但绳端要移动更远。',
    ],
    [
      'Note n, G, and Gp, read F, and check F = (G + Gp) / n.',
      'Drag the rope end and read rope distance s and load rise h. Confirm s = n h.',
      'Read the efficiency and check η = G h / (F s). With Gp away from 0 the efficiency is below 1.',
      'Set Gp = 0 and confirm F = G / n and η = 1.',
      'Increase only the number of segments n. The pull gets smaller, and the rope end must travel farther.',
    ],
    [
      '省力来自多段绳子分担，代价是绳端多移动同样的倍数。',
      '动滑轮自身有重时，效率是 G h / (F s)，低于 1。',
    ],
    [
      'The mechanical advantage comes from several segments sharing the load. The rope end travels that same factor farther.',
      'When the movable pulley has weight, efficiency is G h / (F s) and sits below 1.',
    ],
  ),

  reflection: lab(
    [
      '镜面反射。角度从法线量起，不从镜面量起。',
      '拖动入射光线改变与法线的夹角 θ。',
    ],
    [
      'Reflection at a mirror. Angles are measured from the normal, not from the mirror surface.',
      'Drag the incoming ray to change the angle θ from the normal.',
    ],
    [
      '拖动光线，读取入射角和反射角，确认两者相等。',
      '把 θ 调到 0，确认光线沿法线原路返回。',
      '把 θ 调大，确认反射光线与法线的夹角跟着变大。',
      '用量角器心算镜面夹角 90° - θ，不要把它当成反射定律里的角。',
      '再取两个不同的 θ，每次都核对入射角等于反射角。',
    ],
    [
      'Drag the ray, read the incident and reflected angles, and confirm they are equal.',
      'Set θ to 0 and confirm the ray returns along the normal.',
      'Increase θ and confirm the reflected ray opens by the same angle from the normal.',
      'Compute the angle from the mirror surface, 90° - θ, and do not use that as the angle in the law of reflection.',
      'Take two further values of θ and check each time that the angle of incidence equals the angle of reflection.',
    ],
    [
      '反射定律：入射角等于反射角，两个角都从法线算起。',
      '从镜面量起的角不是这个定律里的角。',
    ],
    [
      'Law of reflection: the angle from the normal is the same for the incoming and reflected rays.',
      'An angle measured from the mirror surface is not the angle in that law.',
    ],
  ),

  refraction: lab(
    [
      '斯涅尔定律 n1 sin θ1 = n2 sin θ2。入射角从法线量起，可以拖动光线。',
      '当 n1 > n2 且 θ1 超过 arcsin(n2/n1) 时，模型只有全反射，没有折射光线。',
    ],
    [
      'Snell law: n1 sin θ1 = n2 sin θ2. The incident angle is from the normal, and the ray can be dragged.',
      'When n1 > n2 and θ1 exceeds arcsin(n2/n1), the model has total internal reflection and no transmitted ray.',
    ],
    [
      '令 n1 = n2，拖动 θ1，确认 θ2 = θ1，光线不偏折。',
      '令 n2 > n1，增大 θ1，确认 θ2 < θ1，光线折向法线。',
      '令 n1 > n2，慢慢增大 θ1，读取 θ2，对照 n1 sin θ1 = n2 sin θ2。',
      '把 θ1 增到超过 arcsin(n2/n1)，确认折射光线消失，只剩反射。',
      '在临界角附近来回微调，看透射忽然消失和重新出现。',
    ],
    [
      'Set n1 = n2, drag θ1, and confirm θ2 = θ1. The ray does not bend.',
      'Set n2 > n1, increase θ1, and confirm θ2 < θ1. The ray bends toward the normal.',
      'Set n1 > n2, raise θ1 slowly, read θ2, and check n1 sin θ1 = n2 sin θ2.',
      'Raise θ1 past arcsin(n2/n1) and confirm the transmitted ray disappears, leaving reflection only.',
      'Nudge around the critical angle and watch transmission vanish and return.',
    ],
    [
      '斯涅尔定律用正弦，不用角度本身。',
      '从光密到光疏，入射角大于临界角时发生全反射。',
    ],
    [
      'Snell law uses sines, not the angles themselves.',
      'From a higher index to a lower index, incidence beyond the critical angle is total internal reflection.',
    ],
  ),

  resistivity: lab(
    [
      '均匀导线的电阻 R = ρ L / A。',
      '电阻率 ρ、长度 L 和截面积 A 可调。这是电阻公式，不是拉丝工艺。',
    ],
    [
      'Resistance of a uniform wire: R = ρ L / A.',
      'Resistivity ρ, length L, and area A are adjustable. This is the resistance formula, not a drawing process.',
    ],
    [
      '记下 ρ、L、A，读取 R，对照 R = ρ L / A。',
      '只把 L 加倍，确认 R 加倍。',
      '只把 A 加倍，确认 R 减半。',
      '只把 ρ 加倍，确认 R 加倍。换一种材料就对应这一步。',
      '让 L 和 A 一起加倍，确认 R 不变。',
    ],
    [
      'Note ρ, L, and A, read R, and check R = ρ L / A.',
      'Double only L and confirm R doubles.',
      'Double only A and confirm R halves.',
      'Double only ρ and confirm R doubles. Changing material corresponds to this step.',
      'Double L and A together and confirm R stays the same.',
    ],
    [
      '电阻与电阻率、长度成正比，与截面积成反比。',
      '同样的材料，又长又细的导线电阻更大。',
    ],
    [
      'Resistance is proportional to resistivity and length, and inversely proportional to area.',
      'For the same material, a longer and thinner wire has a larger resistance.',
    ],
  ),

  'rigid-disk': lab(
    [
      '均匀圆盘绕中心转动。力矩 τ = R F sin φ，φ 从向外的半径量起。',
      '转动惯量 I = ½ M R^2。由静止开始：α = τ / I，ω = α t，θ = ½ α t^2。',
      '按下播放。',
    ],
    [
      'A uniform disk about its centre. The moment is τ = R F sin φ, with φ measured from the outward radius.',
      'I = (1/2) M R^2. From rest: α = τ / I, ω = α t, and θ = (1/2) α t^2.',
      'Press Play.',
    ],
    [
      '令 φ = 90°，播放，读取 τ、I、α 和 θ。',
      '对照 τ = R F，I = ½ M R^2，以及 θ = ½ α t^2。',
      '把 φ 调到 0，确认力矩和角加速度为 0，盘不转。',
      '只增大 F，确认 α 同比增大。',
      '只增大 M，确认 I 增大、α 变小。只增大 R 时，力矩增大，I 按 R^2 增大，要同时看两者。',
    ],
    [
      'Set φ = 90°, press Play, and read τ, I, α, and θ.',
      'Check τ = R F, I = (1/2) M R^2, and θ = (1/2) α t^2.',
      'Set φ to 0 and confirm the moment and angular acceleration are 0, so the disk does not spin.',
      'Increase only F and confirm α scales with it.',
      'Increase only M and confirm I rises while α falls. Increasing R raises the moment and also raises I as R^2, so read both.',
    ],
    [
      '圆盘由静止做匀角加速，转角是 ½ α t^2。',
      '力沿半径时没有力矩。转动惯量是 ½ M R^2。',
    ],
    [
      'From rest the disk has constant angular acceleration, and the angle is (1/2) α t^2.',
      'A force along the radius has no moment. The moment of inertia is (1/2) M R^2.',
    ],
  ),

  ruler: lab(
    [
      '刻度尺读数保留到分度值的下一位，那一位是估计的。',
      '主刻度是 floor(真实长度 / 分度值) × 分度值。估计位是真实边缘进入下一格的十分数。',
      '拖动物体边缘对准读数。',
    ],
    [
      'A ruler reading keeps one estimated digit past the division.',
      'The main mark is floor(true length / division) times the division. The estimated digit is how far the true edge sits into the next division, in tenths.',
      'Drag the object edge onto the reading.',
    ],
    [
      '选定分度值，拖动边缘，读取报告的长度。',
      '把真实长度放在两条刻度正中，确认估计位约为 5。',
      '把边缘刚刚超过一条刻度，确认估计位接近 0 或 1，主刻度是不超过真实长度的那一条。',
      '换更小的分度值，确认估计位所在的数位跟着前移。',
      '不要把读数停在整分度上就结束，除非边缘正好压在刻度线上。',
    ],
    [
      'Choose a division, drag the edge, and read the reported length.',
      'Park the true length halfway between two marks and confirm the estimated digit is about 5.',
      'Park the edge just past a mark and confirm the estimated digit is near 0 or 1. The main mark is the one that does not exceed the true length.',
      'Choose a finer division and confirm the estimated digit moves one place.',
      'Do not stop the reading on a whole division unless the edge sits exactly on a mark.',
    ],
    [
      '读数比分度值多一位，多出来的是估计。',
      '主刻度用不超过真实长度的最大刻度，其余用十分数估计。',
    ],
    [
      'The reading goes one digit past the division, and that digit is estimated.',
      'The main mark is the greatest mark that does not exceed the true length. The rest is estimated in tenths.',
    ],
  ),

  scales: lab(
    [
      '用 log10(L) 把长度放到公开的数量级梯子上。',
      '参照：原子核约 10^-15 m，原子约 10^-10 m，人约 1 m，地球约 10^7 m，1 AU 约 10^11 m。',
      '不要发明梯子上没有的观测。只移动 L 并读最近的一级。',
    ],
    [
      'log10(L) places a length on a public ladder of orders of magnitude.',
      'Marks to use: nucleus about 10^-15 m, atom about 10^-10 m, a person about 1 m, Earth about 10^7 m, 1 AU about 10^11 m.',
      'Do not invent observations that are not on the ladder. Move L and read the nearest rung.',
    ],
    [
      '把 L 设为 1 m，读取 log10(L) = 0，最近的一级是人。',
      '把 L 设到约 10^-10 m，确认最近的是原子，log10 约为 -10。',
      '把 L 设到约 10^-15 m，确认最近的是原子核。',
      '把 L 设到约 10^7 m 和约 10^11 m，确认分别靠近地球和 1 AU。',
      '在两级正中取一个 L，看最近的一级如何切换，不要把对数读成自然对数。',
    ],
    [
      'Set L to 1 m, read log10(L) = 0, and see the nearest rung is a person.',
      'Set L near 10^-10 m and confirm the nearest rung is an atom, with log10 near -10.',
      'Set L near 10^-15 m and confirm the nearest rung is a nucleus.',
      'Set L near 10^7 m and near 10^11 m and confirm the nearest rungs are Earth and 1 AU.',
      'Pick an L halfway between two rungs and watch which one is nearest. Do not read the logarithm as a natural log.',
    ],
    [
      '数量级看的是 log10(L)，每一格是 10 倍。',
      '梯子上的参照长度是公开的约数，不是新的测量。',
    ],
    [
      'Orders of magnitude use log10(L). Each step is a factor of 10.',
      'The rungs are public round numbers, not new measurements.',
    ],
  ),

  simultaneity: lab(
    [
      '固有长度 L0 的杆，两端的闪光在杆的静止系里同时。',
      '杆以 β c 运动时，另一参照系里的时间差 Δt = γ β L0 / c。',
      '闵可夫斯基图上，杆的同时线斜率是 v/c^2 = β/c。拖动轨道上的 β。',
    ],
    [
      'A rod of proper length L0. The ends flash together in the rod frame.',
      'In a frame where the rod moves at β c, the time difference is Δt = γ β L0 / c.',
      'On the Minkowski sketch the slope of the rod-simultaneous line is v/c^2 = β/c. Drag β on the track.',
    ],
    [
      '把 β 调小，读取 Δt，确认两个闪光几乎同时。',
      '拖大 β，确认 γ 和 Δt 都增大，对照 Δt = γ β L0 / c。',
      '只把 L0 加倍，确认同一 β 下 Δt 加倍。',
      '看同时线的斜率，对照 β/c。β 越大，同时线越斜。',
      '回到杆的静止描述，确认那里两端仍然同时。不同时出现在杆运动的那个参照系里。',
    ],
    [
      'Set β small, read Δt, and confirm the two flashes are almost simultaneous.',
      'Drag β upward and confirm both γ and Δt grow. Check Δt = γ β L0 / c.',
      'Double only L0 and confirm Δt doubles at the same β.',
      'Read the slope of the simultaneous line and check β/c. A larger β makes that line steeper.',
      'Return to the rod rest description and confirm the ends are still simultaneous there. The mismatch appears in the frame where the rod moves.',
    ],
    [
      '同时性取决于参照系。运动系里的时间差是 γ β L0 / c。',
      '杆上同时的那条线，斜率是 β/c。',
    ],
    [
      'Simultaneity depends on the frame. In the frame where the rod moves, the time gap is γ β L0 / c.',
      'The line of events that are simultaneous on the rod has slope β/c.',
    ],
  ),

  'single-slit': lab(
    [
      '单缝衍射暗纹，小角近似 y_m ≈ m λ L / a。',
      '缝宽 a、波长 λ、屏距 L 和级次 m 可调。m 从 1 起。',
    ],
    [
      'Single-slit diffraction minima in the small-angle form y_m ≈ m λ L / a.',
      'Slit width a, wavelength λ, screen distance L, and order m are adjustable. m starts at 1.',
    ],
    [
      '令 m = 1，读取第一暗纹位置，对照 y ≈ λ L / a。',
      '把 m 改为 2 和 3，确认暗纹位置近似按级次成倍外移。',
      '只减小 a，确认暗纹远离中心，中央亮纹变宽。',
      '只增大 λ 或 L，确认暗纹同样外移。',
      '记住这是小角近似。级次太高时 y_m 不再远小于 L，公式只作估计。',
    ],
    [
      'Set m = 1 and read the first minimum. Check y ≈ λ L / a.',
      'Set m to 2 and 3 and confirm the minima move outward roughly in proportion to the order.',
      'Decrease only a and confirm the minima move out, so the central bright band widens.',
      'Increase only λ or L and confirm the minima move out as well.',
      'Remember this is a small-angle approximation. At high order, when y_m is not much smaller than L, the formula is only an estimate.',
    ],
    [
      '单缝暗纹位置近似为 m λ L / a。',
      '缝越窄，中央亮纹越宽。',
    ],
    [
      'Single-slit minima sit near y_m = m λ L / a.',
      'A narrower slit makes a wider central bright band.',
    ],
  ),

  solenoid: lab(
    [
      '长直螺线管轴线上 B = μ0 n I。n 是每米匝数，I 是电流。',
      '画出的匝数只影响图，右手四指顺着电流，拇指沿 B 并指向 N 极。',
    ],
    [
      'On the axis of a long solenoid B = μ0 n I. n is turns per metre and I is the current.',
      'The number of drawn turns affects the picture. Curl the fingers of the right hand with the current. The thumb lies along B and names the north end.',
    ],
    [
      '记下 n 和 I，读取 B，对照 B = μ0 n I。',
      '用右手定则标出 N 极，看拇指是否和画面上的 B 同向。',
      '只把 I 反向，确认 B 反向，N 极换到另一端，大小不变。',
      '只增大 n 或 I，确认 B 同比增大。',
      '改变画出的匝数，确认 B 的读数不变。轴上磁场用的是匝密度 n，不是画面上画了几圈。',
    ],
    [
      'Note n and I, read B, and check B = μ0 n I.',
      'Mark the north end with the right-hand rule and see whether the thumb matches B on the stage.',
      'Reverse only I and confirm B reverses, so the north end swaps. The magnitude stays.',
      'Increase only n or only I and confirm B scales.',
      'Change the number of drawn turns and confirm the B readout stays. The axial field uses the turn density n, not how many loops are drawn.',
    ],
    [
      '长螺线管轴上磁感应强度是 μ0 n I。',
      '电流反向则磁场反向，N 极跟着拇指换端。',
    ],
    [
      'On the axis of a long solenoid the field is μ0 n I.',
      'Reversing the current reverses the field, and the north end follows the thumb.',
    ],
  ),

  'solid-pressure': lab(
    [
      '固体压强 p = F / A。同一压力，面积越小压强越大。',
      '拖动接触面改变面积。色块深浅跟着 p 走。',
    ],
    [
      'Solid pressure is p = F / A. The same force on a smaller area gives a larger pressure.',
      'Drag the contact patch to change the area. The patch colour tracks p.',
    ],
    [
      '记下 F 和 A，读取 p，对照 p = F / A。',
      '拖小面积，确认压强变大，色块变深。',
      '只把 F 加倍，确认 p 加倍，面积不变。',
      '让 F 和 A 一起加倍，确认 p 不变。',
      '比较一大一小两个面积上的同一 F，把两次 p 的比和面积的反比对照。',
    ],
    [
      'Note F and A, read p, and check p = F / A.',
      'Drag the area smaller and confirm the pressure rises and the patch darkens.',
      'Double only F and confirm p doubles while the area stays.',
      'Double F and A together and confirm p stays the same.',
      'Compare the same F on a large area and a small area. The ratio of the two pressures is the inverse ratio of the areas.',
    ],
    [
      '压强是压力除以受力面积。',
      '压力相同，面积小的地方压强大。',
    ],
    [
      'Pressure is force divided by area.',
      'For the same force, the smaller area has the larger pressure.',
    ],
  ),

  'sound-absorb': lab(
    [
      '屏障表面反射份额 R，厚度 d 内按系数 α 吸收。',
      '透过的强度 I = I0 (1 - R) e^(-α d)。不要另造一个分贝刻度。',
    ],
    [
      'A barrier reflects a fraction R at the face and absorbs with coefficient α through thickness d.',
      'The intensity that gets through is I = I0 (1 - R) e^(-α d). Do not invent a decibel scale.',
    ],
    [
      '令 R = 0、d = 0，确认 I = I0。',
      '只增大 R，确认一进入屏障就被反射掉一部分，透过强度按 (1 - R) 下降。',
      '令 R 固定，只增大 d 或 α，确认剩下的强度按 e^(-α d) 衰减。',
      '把 d 加倍，比较透过强度是否大约变成原来的 e^(-α d) 倍。',
      '只增大 I0，确认 I 同比增大，R 和 α 不变。',
    ],
    [
      'Set R = 0 and d = 0 and confirm I = I0.',
      'Increase only R and confirm a fraction is reflected at the face, so transmitted intensity falls as (1 - R).',
      'Hold R fixed and increase d or α. The remainder decays as e^(-α d).',
      'Double d and compare the transmitted intensity with an extra factor e^(-α d).',
      'Increase only I0 and confirm I scales. R and α stay as they are.',
    ],
    [
      '透过强度先乘上 (1 - R)，再乘上厚度上的指数衰减。',
      '读数是强度，不是临时发明的分贝。',
    ],
    [
      'Transmitted intensity is multiplied by (1 - R) and then by the exponential decay through the thickness.',
      'The readout is intensity, not a made-up decibel scale.',
    ],
  ),

  'sound-wave': lab(
    [
      '音叉和画出的波都按 y = A sin(2π f t)。',
      '频率是音高，振幅是响度。音色需要别的波形，不在本模型里。按下播放。',
    ],
    [
      'The prong and the drawn wave both follow y = A sin(2π f t).',
      'Frequency is pitch and amplitude is loudness. Timbre would need a different waveform and is outside this model. Press Play.',
    ],
    [
      '按下播放，看叉股和波形一起按正弦振动。',
      '只增大 f，确认振动变快，听感上是音高升高，振幅不变。',
      '只增大 A，确认位移变大，这是更响，频率不变。',
      '在一个周期内核对 y 的最大值是 A、过零两次。',
      '不要把这个纯正弦读成有泛音的音色。',
    ],
    [
      'Press Play and watch the prong and the wave share the same sine.',
      'Increase only f and confirm the vibration speeds up. That is a higher pitch. Amplitude stays.',
      'Increase only A and confirm the displacement grows. That is louder. Frequency stays.',
      'Over one period check that the greatest y is A and that the wave crosses zero twice.',
      'Do not read this pure sine as a timbre with overtones.',
    ],
    [
      '音高对应频率，响度对应振幅，波形都是 A sin(2π f t)。',
      '音色不在这个单频模型里。',
    ],
    [
      'Pitch follows frequency and loudness follows amplitude, both on y = A sin(2π f t).',
      'Timbre is outside this single-frequency model.',
    ],
  ),

  'specific-heat': lab(
    [
      '两个样品接受相同的热量 Q = P t。',
      '各自的升温 ΔT = Q / (c m)。同样质量，比热容大的升温小。按下播放。',
    ],
    [
      'Both samples take the same heat Q = P t.',
      'Each temperature rise is ΔT = Q / (c m). At the same mass, a larger specific heat means a smaller rise. Press Play.',
    ],
    [
      '令 m1 = m2、c1 明显大于 c2，播放一段时间，读取两份 ΔT。',
      '确认热量相同，升温与 c 成反比。',
      '只把 m1 加倍，确认样品 1 升温减半。',
      '只增大功率 P，确认同一时刻两份升温都变大，比值仍由 c m 决定。',
      '用 ΔT = Q / (c m) 回算 c，看是否回到设定值。',
    ],
    [
      'Set m1 = m2 with c1 clearly above c2. Play for a while and read both temperature rises.',
      'Confirm the heat is the same and the rise is inversely proportional to c.',
      'Double only m1 and confirm the rise of sample 1 halves.',
      'Increase only the power P and confirm both rises are larger at the same time. Their ratio is still set by c m.',
      'Invert ΔT = Q / (c m) to recover c, and see whether it matches the value you set.',
    ],
    [
      '相同热量下，升温与比热容和质量的乘积成反比。',
      '两样品的 Q 都是 P t，所以比较的是它们的 c m。',
    ],
    [
      'For the same heat, the temperature rise is inversely proportional to specific heat times mass.',
      'Both samples receive Q = P t, so the comparison is their c m.',
    ],
  ),

  'spring-scale': lab(
    [
      '弹簧在弹性限度内服从胡克定律 F = k x。',
      '拖动挂钩改变伸长 x。超过弹性限度后，这个模型不再给出力。',
    ],
    [
      'Within the elastic limit the spring follows Hooke law F = k x.',
      'Drag the hook to change the extension x. Past the stated limit this model returns no force.',
    ],
    [
      '在限度以内拖动挂钩，读取 F，对照 F = k x。',
      '只把 x 加倍且仍不超过限度，确认 F 加倍。',
      '只增大 k，确认同一伸长下 F 变大。',
      '把 x 拖过弹性限度，确认模型不再给出力。',
      '把限度 xMax 调高，使刚才的 x 重新落在限度内，确认 F = k x 恢复。',
    ],
    [
      'Drag the hook inside the limit, read F, and check F = k x.',
      'Double x while staying inside the limit and confirm F doubles.',
      'Increase only k and confirm F is larger at the same extension.',
      'Drag x past the elastic limit and confirm the model returns no force.',
      'Raise the limit xMax so that same x is inside the limit again, and confirm F = k x returns.',
    ],
    [
      '弹性限度内，弹力与伸长成正比。',
      '超过限度后，本模型不继续沿用 F = k x。',
    ],
    [
      'Inside the elastic limit, force is proportional to extension.',
      'Past the limit, this model does not keep using F = k x.',
    ],
  ),

  'st-graph': lab(
    [
      '位移–时间图分成两段匀速。前段速度 v1，后段速度 v2，换速时刻可调。',
      '拖动图上的时钟标记。平均速率从起点算是 x/t。',
    ],
    [
      'The displacement–time graph is two constant-velocity pieces. First speed v1, second speed v2, and the changeover time are adjustable.',
      'Drag the clock marker on the graph. Average speed from the start is x/t.',
    ],
    [
      '拖动时钟，确认亮点的位置就是该时刻的 x。',
      '在换速前读取斜率，对照 v1。换速后对照 v2。',
      '令 v2 为负，看后段往回走，位移下降。',
      '把时钟停在某一时刻，用从起点到该点的 x/t 作为平均速率，并和两段速度比较。',
      '只改变换速时刻，确认两段各占多久，总位移跟着变。',
    ],
    [
      'Drag the clock and confirm the highlighted point is the position at that time.',
      'Before the changeover read the slope and check v1. After it, check v2.',
      'Make v2 negative and watch the later piece run backward, so displacement falls.',
      'Park the clock at one time and use x/t from the start as the average speed. Compare it with the two piece speeds.',
      'Change only the changeover time and confirm how long each piece lasts. The total displacement follows.',
    ],
    [
      '匀速段的斜率就是该段速度。',
      '从起点算的平均速率是总位移除以总时间，不一定等于其中一段的速度。',
    ],
    [
      'The slope of a constant-velocity piece is that piece speed.',
      'Average speed from the start is total displacement over total time. It need not equal either piece speed.',
    ],
  ),

  'stern-gerlach': lab(
    [
      '自旋 1/2 制备在 +z，沿极角 θ 测量。',
      'P(+) = cos^2(θ/2)，P(-) = sin^2(θ/2)。只讨论这两个概率，不讨论装置如何制造。',
    ],
    [
      'A spin-1/2 is prepared along +z and measured at polar angle θ.',
      'P(+) = cos^2(θ/2) and P(-) = sin^2(θ/2). Stay with those probabilities. Do not discuss how to build the apparatus.',
    ],
    [
      '令 θ = 0，确认 P(+) = 1，P(-) = 0。',
      '令 θ = 180°，确认 P(+) = 0，P(-) = 1。',
      '令 θ = 90°，确认两个概率都是 1/2。',
      '取 60°，对照 cos^2(30°) = 0.75，P(+) 约为 0.75。',
      '扫过几个角度，确认两个概率之和为 1，且不要把公式写成 cos^2 θ。',
    ],
    [
      'Set θ = 0 and confirm P(+) = 1 and P(-) = 0.',
      'Set θ = 180° and confirm P(+) = 0 and P(-) = 1.',
      'Set θ = 90° and confirm both probabilities are 1/2.',
      'Set 60° and check cos^2(30°) = 0.75, so P(+) is about 0.75.',
      'Sweep a few angles and confirm the two probabilities add to 1. Do not write the formula as cos^2 θ.',
    ],
    [
      '测量概率是半角的余弦平方和正弦平方。',
      'θ = 0 沿制备方向，几乎总得到 +。',
    ],
    [
      'The measurement probabilities are the squared cosine and sine of the half angle.',
      'θ = 0 lies along the preparation axis, so the outcome is almost always +.',
    ],
  ),

  stopwatch: lab(
    [
      '60 秒盘面。指针角度是 2π t / 60。',
      '读数把这个角度换回秒。拖动指针。',
    ],
    [
      'A 60 s dial. The hand angle is 2π t / 60.',
      'The reading turns that angle back into seconds. Drag the hand.',
    ],
    [
      '把指针拖到 12 点，确认读数是 0 或 60 秒这一格。',
      '拖到 3 点的位置，确认读数是 15 s，因为走了四分之一圈。',
      '拖到 6 点，确认是 30 s。拖到 9 点，确认是 45 s。',
      '停在两个整秒刻度之间，按角度估计到 0.1 s 量级，再和读数比较。',
      '用 t = (角度 / 2π) × 60 回算一次。',
    ],
    [
      'Drag the hand to 12 and confirm the reading is the 0 or 60 s mark.',
      'Drag it to the 3 o’clock position and confirm 15 s, one quarter of the dial.',
      'Drag it to 6 and confirm 30 s. Drag it to 9 and confirm 45 s.',
      'Park between two whole-second marks, estimate to about 0.1 s from the angle, and compare with the reading.',
      'Compute t = (angle / 2π) × 60 once and check the readout.',
    ],
    [
      '秒表盘把时间画成 60 秒一圈。',
      '读数就是指针角度换算回的秒数。',
    ],
    [
      'The stopwatch dial draws time as one revolution per 60 s.',
      'The reading is that angle turned back into seconds.',
    ],
  ),

  sublimation: lab(
    [
      '恒定功率 P 加热会升华的固体。升华点 Ts 上吸收潜热 Ls，Q = m Ls。',
      '这个模型没有液态区间。拖动 T–t 图上的时间，或用播放。',
    ],
    [
      'A solid that sublimes, heated at constant power P. At the sublimation point Ts it absorbs latent heat Ls, Q = m Ls.',
      'This model has no liquid interval. Drag time on the T–t graph, or use Play.',
    ],
    [
      '从初温播放到平台前，确认固体温度上升。',
      '拖到平台上，确认温度停在 Ts，热量仍在增加。',
      '对照平台上的 Q = m Ls。',
      '拖过平台，确认直接变成气体后再升温，中间没有第二个平台。',
      '增大 m 或减小 P，确认在 Ts 上停留更久。',
    ],
    [
      'Play from the start temperature up to the plateau and confirm the solid temperature rises.',
      'Drag onto the plateau and confirm the temperature stays at Ts while heat still increases.',
      'On the plateau check Q = m Ls.',
      'Drag past the plateau and confirm the sample becomes gas and then warms, with no second plateau.',
      'Increase m or lower P and confirm the stay at Ts lasts longer.',
    ],
    [
      '升华时温度停在 Ts，吸收的热量是 m Ls。',
      '本模型从固体直接到气体，没有熔化平台。',
    ],
    [
      'During sublimation the temperature stays at Ts, and the heat absorbed is m Ls.',
      'This model goes from solid to gas with no melting plateau.',
    ],
  ),

  telescope: lab(
    [
      '天文望远镜，物体在无穷远，系统是无焦的。',
      '角放大率 M ≈ -f_obj / f_eye，镜筒长度约 f_obj + f_eye。',
      '负号表示倒立。物镜焦距和目镜焦距可调。',
    ],
    [
      'An astronomical telescope for an object at infinity, in an afocal arrangement.',
      'Angular magnification M ≈ -f_obj / f_eye, and the tube length is about f_obj + f_eye.',
      'The minus sign means an inverted image. Objective and eyepiece focal lengths are adjustable.',
    ],
    [
      '记下两个焦距，读取 M 和镜筒长度。',
      '对照 M ≈ -f_obj / f_eye，以及长度 ≈ f_obj + f_eye。',
      '只增大物镜焦距，确认 |M| 变大，镜筒变长。',
      '只增大目镜焦距，确认 |M| 变小，镜筒变长。',
      '确认 M 为负，像是倒的。不要把镜筒长度当成放大率。',
    ],
    [
      'Note both focal lengths and read M and the tube length.',
      'Check M ≈ -f_obj / f_eye and length ≈ f_obj + f_eye.',
      'Increase only the objective focal length and confirm |M| grows and the tube gets longer.',
      'Increase only the eyepiece focal length and confirm |M| shrinks and the tube gets longer.',
      'Confirm M is negative, so the image is inverted. Do not treat the tube length as the magnification.',
    ],
    [
      '无穷远物体的角放大率约是物镜焦距与目镜焦距之比，带一个负号。',
      '无焦镜筒长约两个焦距之和。',
    ],
    [
      'For an object at infinity the angular magnification is about the objective focal length over the eyepiece focal length, with a minus sign.',
      'The afocal tube is about the sum of the two focal lengths.',
    ],
  ),

  thermometer: lab(
    [
      '线性刻度上，读数就是温度 T。',
      '液柱高度是 (T - Tmin) / (Tmax - Tmin)。拖动温度。',
      '先看量程再读数，不要把液柱高度本身当成温度。',
    ],
    [
      'On a linear scale the reading is the temperature T.',
      'Column height is the fraction (T - Tmin) / (Tmax - Tmin). Drag the temperature.',
      'Read the range before the mark. Do not treat the column height itself as the temperature.',
    ],
    [
      '把 T 拖到 Tmin 和 Tmax，确认液柱在底端和顶端。',
      '把 T 放在量程中点，确认液柱约在一半高度。',
      '改变 Tmin 或 Tmax，看同一 T 的液柱高度改变，读数 T 本身不变。',
      '在刻度之间估计一位，再和设定的 T 比较。',
      '用高度分数回算 T = Tmin + 高度分数 × (Tmax - Tmin)。',
    ],
    [
      'Drag T to Tmin and to Tmax and confirm the column sits at the bottom and at the top.',
      'Park T at mid-range and confirm the column is about halfway up.',
      'Change Tmin or Tmax and watch the column height at the same T change, while the reading T stays.',
      'Estimate one digit between marks and compare it with the T you set.',
      'Recover T = Tmin + height fraction × (Tmax - Tmin).',
    ],
    [
      '线性温度计的液柱高度是量程上的分数。',
      '读数是温度，不是液柱的毫米数。',
    ],
    [
      'On a linear thermometer the column height is a fraction of the scale range.',
      'The reading is the temperature, not the millimetres of the column.',
    ],
  ),

  'thin-film': lab(
    [
      '薄膜亮纹条件。通道可在反射和透射之间切换。',
      '反射（净 π 相位差）：2 n t = (m + 1/2) λ。透射（没有净相位差）：2 n t = m λ。',
      '折射率 n、厚度 t、波长 λ 和级次 m 可调。',
    ],
    [
      'Thin-film bright condition. Switch the channel between reflect and transmit.',
      'Reflect (net phase flip of π): 2 n t = (m + 1/2) λ. Transmit (no net flip): 2 n t = m λ.',
      'Index n, thickness t, wavelength λ, and order m are adjustable.',
    ],
    [
      '选反射，记下 2 n t 和 (m + 1/2) λ，看它们是否相等。',
      '改厚度或波长，把两边调到相等，确认满足亮纹条件。',
      '切换到透射，确认条件变成 2 n t = m λ，同一个 t 往往不再同时满足反射亮纹。',
      '只增大 n，确认光程 2 n t 变大，要更薄或更长的波长才能配上同一级。',
      '把 m 增加 1，确认下一条亮纹对应更厚的膜或更短的波长。',
    ],
    [
      'Choose reflect and record 2 n t and (m + 1/2) λ. See whether they match.',
      'Change thickness or wavelength until the two sides match, and confirm the bright condition.',
      'Switch to transmit and confirm the condition becomes 2 n t = m λ. The same t often does not satisfy the reflection bright condition at the same time.',
      'Increase only n and confirm the path 2 n t grows, so a thinner film or a longer wavelength is needed for the same order.',
      'Increase m by 1 and confirm the next bright fringe wants a thicker film or a shorter wavelength.',
    ],
    [
      '反射亮纹带半个波长，透射亮纹是整数个波长。',
      '差别来自有没有净 π 的相位变化。',
    ],
    [
      'A reflection bright fringe includes a half wavelength. A transmission bright fringe is a whole number of wavelengths.',
      'The difference is whether there is a net phase flip of π.',
    ],
  ),

  'time-dilation': lab(
    [
      '时间延缓的教学关系 Δt = γ Δτ，γ = 1/√(1 - v^2/c^2)。',
      '速率 v 和固有时 Δτ 可调。只比较这两个时间，不讨论时钟的制造。',
    ],
    [
      'Time dilation as a teaching relation: Δt = γ Δτ, with γ = 1/sqrt(1 - v^2/c^2).',
      'Speed v and proper time Δτ are adjustable. Compare those two times only. Do not turn this into building a clock.',
    ],
    [
      '把 v 调小，读取 γ 和 Δt，确认 Δt 几乎等于 Δτ。',
      '增大 v，确认 γ 增大，坐标时间 Δt 长于固有时。',
      '只把 Δτ 加倍，确认 Δt 加倍，γ 不变。',
      '在同一个 v 下核对 Δt / Δτ = γ。',
      '不要把固有时读成运动钟走得更快。运动钟记下的是更短的 Δτ。',
    ],
    [
      'Set v small, read γ and Δt, and confirm Δt is almost Δτ.',
      'Increase v and confirm γ rises, so the coordinate time Δt is longer than the proper time.',
      'Double only Δτ and confirm Δt doubles. γ is unchanged.',
      'At one fixed v check Δt / Δτ = γ.',
      'Do not read the proper time as the moving clock running fast. The moving clock records the shorter interval Δτ.',
    ],
    [
      '坐标时间是固有时乘以 γ。',
      'v 远小于 c 时，γ 接近 1。',
    ],
    [
      'Coordinate time is proper time multiplied by γ.',
      'When v is far below c, γ is near 1.',
    ],
  ),

  transformer: lab(
    [
      '理想变压器：U1 / U2 = n1 / n2，I1 / I2 = n2 / n1。',
      '输入功率和输出功率相等。匝数、原边电压和副边电流可调。',
    ],
    [
      'An ideal transformer: U1 / U2 = n1 / n2 and I1 / I2 = n2 / n1.',
      'Input power matches output power. Turns, primary voltage, and secondary current are adjustable.',
    ],
    [
      '令 n1 = n2，读取 U2 和 I1，确认电压相等、电流相等。',
      '令 n2 > n1，确认 U2 > U1，这是升压，同时 I2 给定时 I1 更大。',
      '令 n2 < n1，确认电压下降、原边电流小于副边电流。',
      '读取两侧功率，确认 U1 I1 = U2 I2。',
      '只增大 U1，确认 U2 同比增大，匝数比不变。',
    ],
    [
      'Set n1 = n2, read U2 and I1, and confirm voltage and current match on the two sides.',
      'Set n2 > n1 and confirm U2 > U1, a step-up, while I1 is larger than the given I2.',
      'Set n2 < n1 and confirm the voltage falls and the primary current is smaller than the secondary current.',
      'Read the power on both sides and confirm U1 I1 = U2 I2.',
      'Increase only U1 and confirm U2 scales. The turns ratio stays.',
    ],
    [
      '理想变压器电压比等于匝数比，电流比等于匝数反比。',
      '因此两侧功率相同。',
    ],
    [
      'On an ideal transformer the voltage ratio equals the turns ratio, and the current ratio is the inverse.',
      'The two sides therefore carry the same power.',
    ],
  ),

  'transmission-line': lab(
    [
      '无损耗 TEM 传输线。单位长度电感 L′ 和单位长度电容 C′ 可调。',
      '特性阻抗 Z0 = √(L′ / C′)，波速 v = 1 / √(L′ C′)。',
    ],
    [
      'A lossless TEM line. Inductance per length L′ and capacitance per length C′ are adjustable.',
      'Characteristic impedance Z0 = √(L′ / C′) and wave speed v = 1 / √(L′ C′).',
    ],
    [
      '记下 L′ 和 C′，读取 Z0 和 v。',
      '对照 Z0 = √(L′ / C′) 与 v = 1 / √(L′ C′)。',
      '只增大 C′，确认 Z0 下降、v 也下降。',
      '只增大 L′，确认 Z0 上升、v 下降。',
      '让 L′ 和 C′ 按同一倍数增大，确认 Z0 不变而 v 下降。',
    ],
    [
      'Note L′ and C′, and read Z0 and v.',
      'Check Z0 = √(L′ / C′) and v = 1 / √(L′ C′).',
      'Increase only C′ and confirm both Z0 and v fall.',
      'Increase only L′ and confirm Z0 rises while v falls.',
      'Scale L′ and C′ by the same factor and confirm Z0 stays while v falls.',
    ],
    [
      '特性阻抗看 L′ 与 C′ 之比，波速看两者的乘积。',
      '无损耗线的这两个量都由单位长度的 L′ 和 C′ 决定。',
    ],
    [
      'Characteristic impedance follows the ratio of L′ to C′. Wave speed follows their product.',
      'On a lossless line both quantities are set by L′ and C′ per length.',
    ],
  ),

  'two-force': lab(
    [
      '二力平衡作用在同一个物体上：大小相等、方向相反、同一直线。',
      '若两个力作用在两个物体上，它们是相互作用力，这个一维平衡检验不适用。',
      '平衡成立时 a = Fnet / m。开关可以选择是否同一物体、是否共线。按下播放。',
    ],
    [
      'Two-force equilibrium acts on one body: equal magnitude, opposite direction, same line.',
      'If the forces act on two bodies, they are an interaction pair, and this one-dimensional equilibrium test does not apply.',
      'When it does apply, a = Fnet / m. Switches choose same body and same line. Press Play.',
    ],
    [
      '打开同一物体和同一直线，令 F2 = -F1，播放，确认加速度为 0。',
      '只把 F2 改得不等于 -F1，确认 Fnet 不为 0，a = Fnet / m。',
      '关掉同一直线，即使大小相反，也不要把它当成平衡。',
      '关掉同一物体，确认画面把它们当成相互作用力，一维平衡检验不再适用。',
      '在确实平衡的那一组里增大 m，确认 a 仍为 0。在不平衡的一组里增大 m，确认 |a| 变小。',
    ],
    [
      'Turn on same body and same line, set F2 = -F1, press Play, and confirm the acceleration is 0.',
      'Change F2 so it is not -F1 and confirm Fnet is not 0, with a = Fnet / m.',
      'Turn off same line. Even with opposite magnitudes, do not call it equilibrium.',
      'Turn off same body and confirm the stage treats them as an interaction pair. The one-dimensional equilibrium test no longer applies.',
      'In a pair that really is balanced, increase m and confirm a stays 0. In an unbalanced pair, increase m and confirm |a| falls.',
    ],
    [
      '二力平衡要同时满足同一物体、等大、反向、共线。',
      '作用在两个物体上的力不是这个平衡条件的对象。',
    ],
    [
      'Two-force equilibrium needs one body, equal magnitude, opposite direction, and one line, all at once.',
      'Forces on two bodies are not the subject of that equilibrium test.',
    ],
  ),

  vision: lab(
    [
      '单片矫正透镜，用学校里的符号约定。这不是完整的眼睛模型。',
      '近视：远处物体成像在远点，f = -D，D 是远点距离。',
      '远视：阅读距离处的物体成像在近点，1/u + 1/(-N) = 1/f。',
    ],
    [
      'A single correcting lens with the school sign convention. This is not a full eye model.',
      'Myopia: a distant object is imaged at the far point, f = -D, where D is the far-point distance.',
      'Hyperopia: an object at the reading distance is imaged at the near point, 1/u + 1/(-N) = 1/f.',
    ],
    [
      '选近视，把物距放到约 500 cm 或更远，读取焦距和焦度，对照 f = -D，焦距为负，焦度是 100/f(cm)。',
      '改变远点，确认远点越近，|f| 越小，凹透镜度数越高。',
      '把近视物距调到 500 cm 以下，确认改用 1/u + 1/(-D) = 1/f，镜片仍是负的。',
      '改选远视，记下阅读距离 u 和近点 N，对照 1/u + 1/(-N) = 1/f。',
      '改变近点或阅读距离，确认 f 为正，并且不要把这片透镜当成整个眼球。',
    ],
    [
      'Choose myopia and set the object distance at about 500 cm or farther. Read the focal length and the power. Check f = -D. The focal length is negative, and the power is 100/f(cm).',
      'Change the far point and confirm a nearer far point means a smaller |f| and a stronger diverging lens.',
      'Bring the myopia object distance below 500 cm and confirm the stage uses 1/u + 1/(-D) = 1/f. The lens stays diverging.',
      'Switch to hyperopia, note the reading distance u and the near point N, and check 1/u + 1/(-N) = 1/f.',
      'Change the near point or the reading distance and confirm f is positive. Do not treat this lens as the whole eye.',
    ],
    [
      '近视用负透镜把无穷远投到远点，f = -D。',
      '远视用 1/u + 1/(-N) = 1/f，把阅读距离成像到近点。',
    ],
    [
      'Myopia uses a diverging lens to place infinity at the far point, f = -D.',
      'Hyperopia uses 1/u + 1/(-N) = 1/f to image the reading distance at the near point.',
    ],
  ),

  'vt-area': lab(
    [
      '匀加速：v = v0 + a t，x = v0 t + ½ a t^2。',
      '拖动区间端点 t1、t2 和时钟。v–t 图上 t1 到 t2 的有符号面积等于 x(t2) - x(t1)。',
    ],
    [
      'Constant acceleration: v = v0 + a t and x = v0 t + (1/2) a t^2.',
      'Drag the interval ends t1 and t2, and the clock. The signed area under v–t from t1 to t2 equals x(t2) - x(t1).',
    ],
    [
      '拖动时钟，读取该时刻的 v 和 x，对照 v = v0 + a t。',
      '把 t1 放在 0、t2 放在某一时刻，读取面积，对照 x(t2) - x(t1)。',
      '令 a 为负且区间跨过速度变号，确认面积可以变小，因为它有符号。',
      '只增大 a，确认同一区间的面积变化，位移差跟着变。',
      '用 ½ (v(t1) + v(t2)) (t2 - t1) 再算一次梯形面积，和读数比较。',
    ],
    [
      'Drag the clock and read v and x at that time. Check v = v0 + a t.',
      'Park t1 at 0 and t2 at a later time, read the area, and check x(t2) - x(t1).',
      'Make a negative and let the interval cross a sign change of velocity. The area can shrink because it is signed.',
      'Increase only a and confirm the area of the same interval changes, and the displacement difference with it.',
      'Compute (1/2) (v(t1) + v(t2)) (t2 - t1) once and compare that trapezoid with the readout.',
    ],
    [
      'v–t 图的有符号面积就是位移的变化。',
      '匀加速下速度直线变化，位移是 v0 t + ½ a t^2。',
    ],
    [
      'The signed area under v–t is the change in displacement.',
      'Under constant acceleration, velocity changes in a straight line and displacement is v0 t + (1/2) a t^2.',
    ],
  ),

  'wave-packet': lab(
    [
      '自由高斯波包。中心以 ℏ k0 / m 运动。',
      '宽度 σ(t) = σ0 √(1 + (ℏ t / (2 m σ0^2))^2)。初宽度 σ0 和波数 k0 可调。',
      '按下播放。波包会散开，不要把它当成不变形的经典粒子。',
    ],
    [
      'A free Gaussian packet. The centre moves at ℏ k0 / m.',
      'The width is σ(t) = σ0 √(1 + (ℏ t / (2 m σ0^2))^2). Initial width σ0 and wave number k0 are adjustable.',
      'Press Play. The packet spreads. Do not treat it as a classical particle that keeps its shape.',
    ],
    [
      '按下播放，跟踪波包中心，确认它匀速移动，速度对应 ℏ k0 / m。',
      '只增大 k0，确认中心跑得更快，初始宽度不变。',
      '在几个时刻读取宽度，对照 σ(t) 的公式，看它随时间变大。',
      '只减小 σ0，确认起始更窄，但稍后散得更快。',
      '令 k0 = 0，确认中心不动，宽度仍然增加。',
    ],
    [
      'Press Play, follow the centre, and confirm it moves at constant speed matching ℏ k0 / m.',
      'Increase only k0 and confirm the centre runs faster. The initial width stays.',
      'Read the width at a few times and check the formula for σ(t). It grows with time.',
      'Decrease only σ0 and confirm a narrower start that later spreads faster.',
      'Set k0 = 0 and confirm the centre stays put while the width still grows.',
    ],
    [
      '波包中心的速度是 ℏ k0 / m。',
      '宽度随时间增大，初始越窄，散开越快。',
    ],
    [
      'The packet centre moves at ℏ k0 / m.',
      'The width grows with time. A narrower start spreads faster.',
    ],
  ),

  waveguide: lab(
    [
      '矩形波导 TE10 模，宽边 a，截止频率 fc = c / (2 a)。',
      '频率 f 低于 fc 时不传播。只比较截止，不讨论如何加工波导。',
    ],
    [
      'TE10 mode of a rectangular guide of width a, with cutoff fc = c / (2 a).',
      'A mode with f below fc does not propagate. Compare the cutoff only. Do not discuss how to machine a guide.',
    ],
    [
      '记下 a，读取 fc，对照 fc = c / (2 a)。',
      '把 f 设在 fc 以下，确认读数标明不传播。',
      '把 f 调到 fc 以上，确认可以传播。',
      '只加宽 a，确认 fc 下降，原先不能传播的频率可能变为可以传播。',
      '在 fc 两侧各取一个频率，不要把截止以下的场写成行波。',
    ],
    [
      'Note a, read fc, and check fc = c / (2 a).',
      'Set f below fc and confirm the readout says the mode does not propagate.',
      'Raise f above fc and confirm it can propagate.',
      'Widen a only and confirm fc falls, so a frequency that did not propagate may start to.',
      'Take one frequency on each side of fc. Do not describe the field below cutoff as a travelling wave.',
    ],
    [
      'TE10 截止频率与宽边成反比。',
      'f < fc 的模式不传播。',
    ],
    [
      'The TE10 cutoff is inversely proportional to the guide width.',
      'A mode with f < fc does not propagate.',
    ],
  ),

  work: lab(
    [
      '功 W = F s cos θ，θ 是力与位移的夹角。平均功率 P = W / t。',
      '拖动位移的长度。力、位移、夹角和时间都可调。',
    ],
    [
      'Work is W = F s cos θ, with θ between the force and the displacement. Average power is P = W / t.',
      'Drag the length of the displacement. Force, displacement, angle, and time are adjustable.',
    ],
    [
      '令 θ = 0，拖动位移，读取 W，对照 W = F s。',
      '令 θ = 90°，确认 cos θ = 0，功为 0，无论 F 和 s 多大。',
      '令 θ = 180°，确认功为负，力与位移反向。',
      '固定 W，只把 t 加倍，确认平均功率减半。',
      '令 θ = 60°，对照 cos 60° = 0.5，功是 F s 的一半。',
    ],
    [
      'Set θ = 0, drag the displacement, read W, and check W = F s.',
      'Set θ = 90° and confirm cos θ = 0, so the work is 0 no matter how large F and s are.',
      'Set θ = 180° and confirm the work is negative. Force and displacement are opposite.',
      'Hold W fixed and double t. Confirm the average power halves.',
      'Set θ = 60° and check cos 60° = 0.5, so the work is half of F s.',
    ],
    [
      '功是力、位移和夹角余弦的乘积。',
      '平均功率是这份功除以时间。',
    ],
    [
      'Work is force times displacement times the cosine of the angle between them.',
      'Average power is that work divided by time.',
    ],
  ),
};
export default LAB_BY_SIM;
