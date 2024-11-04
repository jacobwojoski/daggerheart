export {DH_MathLib}

/* Class for any math related library funtions */
class DH_MathLib {

    // Decrip: Take a total_coins value and split it into Chests, Bags, Handfuls, Coins 
    distributeTotalCoins(total_coins){
        let remainder = 0;
        let num_chests=0, num_bags=0, num_handfuls=0, num_coins=0;
        /* Chests,   Bags,   Handfuls,   Coins */
        /*  1000c    100c         10c       1c */

        // Calc Num chests
        if (total_coins / 1000 > 0){
            num_chests = Math.floor(total_coins / 1000);
            remainder = total_coins%1000;
        }

        // Calc Num Bags
        if(remainder>0 && remainder/100>0){
            num_bags = Math.floor(remainder / 100);
            remainder = remainder%100;
        }

        // Calc Num Handfuls
        if(remainder>0 && remainder/10>0){
            num_bags = Math.floor(remainder / 10);
            remainder = remainder%10;
        }

        // Calc Num Coins
        if(remainder>0){
            num_coins = remainder;
        }

        return [num_chests,num_bags,num_handfuls,num_coins]
    }
}