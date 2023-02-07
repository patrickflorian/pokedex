export interface Pokemon {
    id:                                 number;
    pokedexId:                          number;
    name:                               string;
    image:                              string;
    sprite:                             string;
    slug:                               string;
    stats:                              Stats;
    apiTypes:                           APIType[];
    apiGeneration:                      number;
    apiResistances:                     APIResistance[];
    resistanceModifyingAbilitiesForApi: any[];
    apiEvolutions:                      APIEvolution[];
    apiPreEvolution:                    APIPreEvolution;
    apiResistancesWithAbilities:        any[];
}

export interface APIEvolution {
    name:      string;
    pokedexId: number;
}

export interface APIPreEvolution {
    name:      string;
    pokedexIdd: number;
}

export interface APIResistance {
    name:              string;
    damage_multiplier: number;
    damage_relation:   DamageRelation;
}

export enum DamageRelation {
    Neutral = "neutral",
    Resistant = "resistant",
    TwiceResistant = "twice_resistant",
    Vulnerable = "vulnerable",
}

export interface APIType {
    name:  string;
    image: string;
}

export interface Stats {
    HP:              number;
    attack:          number;
    defense:         number;
    special_attack:  number;
    special_defense: number;
    speed:           number;
}