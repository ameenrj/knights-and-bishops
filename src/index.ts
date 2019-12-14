import BishopsAndKnights from './BishopsAndKnights'

const chessConfig = {
  NUMBER_OF_RANKS: 8,
  NUMBER_OF_FILES: 8
}

const main = () => {
  const bishopsAndKnights = new BishopsAndKnights(chessConfig)
  bishopsAndKnights.run()
}

main()
